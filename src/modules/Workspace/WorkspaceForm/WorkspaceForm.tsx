import { useEffect } from "react";

import { useParams } from "react-router";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";


import { updateFormField } from "./forms";
import { useFormData } from "./useFormData";
import { Header } from "./Header";
import { Questions } from "./Questions";


export const WorkspaceForm = () => {

    const { formId } = useParams();
    const formData = useFormData({ formId });

    const form = useForm({
        defaultValues: {
            title: formData.title,
            description: formData.description,
        },
    });

    useEffect(() => {
        updateFormField({ formId, field: { name: "title", val: form.getValues().title } })
    }, [form.getValues().title]);

    useEffect(() => {
        updateFormField({ formId, field: { name: "description", val: form.getValues().description } })
    }, [form.getValues().description]);

    return (
        <div className="page">
            <Header onSelectDate={() => { }} />

            <Form {...form}>
                <form className="flex flex-col gap-5">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom du Formulaire</FormLabel>
                                <FormControl>
                                    <Input {...field}></Input>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <ReactQuill {...field}></ReactQuill>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormItem>
                        <FormLabel>Dates de disponibilités</FormLabel>
                        <FormControl>
                            <Questions formId={formId} questions={formData.questions} />
                        </FormControl>
                    </FormItem>
                </form>
            </Form >
        </div >
    )
}