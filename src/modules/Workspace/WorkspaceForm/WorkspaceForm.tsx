import { useEffect, useState } from "react";

import { useParams } from "react-router";
import { useForm } from "react-hook-form";

import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { updateFormField } from "./forms";
import Toolbar from "./Toolbar";
import { useFormData } from "./useFormData";

export const WorkspaceForm = () => {

    const { formId } = useParams();
    const formData = useFormData({ formId });
    const [dates, setDates] = useState(new Set(formData.questions));

    const addDate = (date) => {
        setDates(prevDates => new Set(prevDates).add(date?.toDateString()));
    }

    useEffect(() => {
        updateFormField({ formId, field: { name: "questions", val: Array.from(dates) } });
    }, [dates]);

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
            <Toolbar onSelectDate={addDate} />

            <Form {...form}>
                <form>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
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
                                <FormControl>
                                    <ReactQuill {...field}></ReactQuill>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form >
            <section className="mx-auto max-w-lg flex flex-col auto-rows-min p-5">
                <ul>
                    {Array.from(dates)
                        .sort((a, b) => new Date(a) - new Date(b))
                        .map((date, i) => (
                            <li key={i} className="flex justify-between">
                                {new Date(date).toLocaleDateString()}
                                <span className="flex items-center space-x-2">
                                    <Switch />
                                </span>
                            </li>
                        ))}
                </ul>
            </section>
        </div >
    )
}