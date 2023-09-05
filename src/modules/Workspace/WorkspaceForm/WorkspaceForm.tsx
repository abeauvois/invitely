/**
 * @TODO:
 * - if this form is locked:
 * -- the `Send` button must be changed to a `Duplicate` button
 * -- an info icon explains that since the form has been sent, it is locked, but that they can duplicate the form
 *    and send that new one
 */

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
import { IconTooltip } from "@/shared/components/IconTooltip";

const Header = ({ toUrl, isFormLocked }) => {
    const navigate = useNavigate();
    return (
        <PageActions backTo={{ url: "/workspace", label: "Workspace" }} pageTitle="Formulaire" >
            <Button variant="primary" disabled={isFormLocked} onClick={() => navigate(toUrl)}>
                Envoyer
            </Button>
            {isFormLocked &&
                <IconTooltip icon="info" label="&nbsp;" title="Ce forumulaire est bloqué" message="Ayant déjà été envoyé, ce formulaire ne peut plus être modifier.  Il est toutefois possible de retourner sur l'espace Workspace, et de le dupliquer afin de pouvoir le renvoyer." />
            }

        </PageActions >
    )
}

const TitleSection = ({ control, disabled }) => (
    <FormField
        control={control}
        name="title"
        render={({ field }) => (
            <FormItem>
                <FormLabel>Nom du Formulaire</FormLabel>
                <FormControl>
                    <Input {...field} disabled={disabled}></Input>
                </FormControl>
            </FormItem>
        )}
    />
)

const DateListSection = ({ formId, dateList, disabled }) => (
    <FormItem className="text-center">
        <FormLabel>Dates de disponibilités</FormLabel>
        <FormControl>
            <DateList formId={formId} dateList={dateList} disabled={disabled} />
        </FormControl>
    </FormItem>
)

export const loader = (async ({ params }) => {
    const { formId } = params;
    const formDataDefault = await getForm({ formId });
    return { formId, formDataDefault, isFormLocked: !!formDataDefault.sentAt };
}) satisfies LoaderFunction

export const WorkspaceForm = () => {

    const { formId, formDataDefault, isFormLocked } = useLoaderData<typeof loader>();
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
            <Header toUrl={`/workspace/form/${formId}/compose`} isFormLocked={isFormLocked} />
            <Form {...form}>
                <form
                    className="flex flex-col gap-5"
                    onSubmit={form.handleSubmit(preventSubmit)}>
                    <TitleSection control={form.control} disabled={isFormLocked} />
                    <RichTextInput fieldName="description" control={form.control} disabled={isFormLocked} />
                    <DateListSection formId={formId} dateList={dateList} disabled={isFormLocked} />
                </form>
            </Form >
        </div >
    )
}