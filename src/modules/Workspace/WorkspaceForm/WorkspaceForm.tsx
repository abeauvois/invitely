import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { LoaderFunction, useLoaderData } from "react-router-typesafe";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/shadcn-components/ui/form";
import { Input } from "@/shadcn-components/ui/input";
import { PageActions } from "@/shared/components/PageActions";
import { Button } from "@/shadcn-components/ui/button";
import { preventSubmit } from "@/utils";

import { getForm, updateFormField } from "../forms";
import { DateList } from "./DateList";
import { TextInput } from "@/shared/components/Form/TextInput";
import { RichTextInput, notEqualToPBrP } from "./RichTextInput";
import { IconTooltip } from "@/shared/components/IconTooltip";
import { z } from "zod";

const formSchema = z.object({
    title: z.string().nonempty(),
    description: z.string().refine(notEqualToPBrP, {
        message: "Le corps du mail est obligatoire",
    }),
    dateList: z.array(
        z.object({
            date: z.coerce.date()
        })
    ).min(1, {
        message: "Veuillez ajouter au moins 1 date"
    })
})

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
                    <TextInput control={form.control} fieldName="title" fieldLabel="Nom du Formulaire" disabled={isFormLocked} />
                    <RichTextInput fieldName="description" control={form.control} disabled={isFormLocked} />
                    <DateListSection formId={formId} dateList={formData.dateList} disabled={isFormLocked} />
                </form>
            </Form >
        </div >
    )
}