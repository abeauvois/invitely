import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { LoaderFunction, useLoaderData } from "react-router-typesafe";
import { useForm } from "react-hook-form";
import 'react-quill/dist/quill.snow.css';

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/shadcn-components/ui/form";
import { Input } from "@/shadcn-components/ui/input";
import { PageActions } from "@/shared/components/PageActions";
import { Button } from "@/shadcn-components/ui/button";
import { preventSubmit } from "@/utils";

import { getForm, updateFormField } from "../forms";
import { DateList } from "./DateList";
import { RichTextInput } from "./RichTextInput";

const Header = ({ toUrl }) => {
    const navigate = useNavigate();
    return (
        <PageActions backTo={{ url: "/workspace", label: "Workspace" }} pageTitle="Formulaire" >
            <Button variant="primary" onClick={() => navigate(toUrl)}>
                Envoyer
            </Button>
        </PageActions >
    )
}

const TitleSection = ({ control }) => (
    <FormField
        control={control}
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
)

const DateListSection = ({ formId, dateList }) => (
    <FormItem className="text-center">
        <FormLabel>Dates de disponibilités</FormLabel>
        <FormControl>
            <DateList formId={formId} dateList={dateList} />
        </FormControl>
    </FormItem>
)

export const loader = (async ({ params }) => {
    const { formId } = params;
    const formDataDefault = await getForm({ formId });
    return { formId, formDataDefault };
}) satisfies LoaderFunction

export const WorkspaceForm = () => {

    const { formId, formDataDefault } = useLoaderData<typeof loader>();
    const [formData] = useState(formDataDefault);
    const dateList = formData.dateList;

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
            <Header toUrl={`/workspace/form/${formId}/compose`} />
            <Form {...form}>
                <form
                    className="flex flex-col gap-5"
                    onSubmit={form.handleSubmit(preventSubmit)}>
                    <TitleSection control={form.control} />
                    <RichTextInput fieldName="description" control={form.control} />
                    <DateListSection formId={formId} dateList={dateList} />
                </form>
            </Form >
        </div >
    )
}