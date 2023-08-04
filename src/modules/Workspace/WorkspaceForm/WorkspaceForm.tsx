import { useEffect } from "react";

import { useParams } from "react-router";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IconTooltip } from "@/shared/components/IconTooltip";

import { updateFormField } from "../forms";
import { useFormData } from "./useFormData";
import { Header } from "./Header";
import { Questions } from "./Questions";

import { RocketIcon } from "@radix-ui/react-icons"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"


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
                                <FormLabel>
                                    <IconTooltip icon="info" label="Description">
                                        <Alert>
                                            <RocketIcon className="h-4 w-4" />
                                            <AlertTitle>Bon à savoir!</AlertTitle>
                                            <AlertDescription>
                                                Ce texte sera inclus dans le courriel<br />envoyé aux destinataires de ce formulaire.
                                            </AlertDescription>
                                        </Alert>
                                    </IconTooltip>
                                </FormLabel>
                                <FormControl>
                                    <ReactQuill {...field}></ReactQuill>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormItem className="text-center">
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