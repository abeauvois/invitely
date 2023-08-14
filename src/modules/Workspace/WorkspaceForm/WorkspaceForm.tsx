import { useEffect } from "react";

import { useParams } from "react-router";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IconTooltip } from "@/shared/components/IconTooltip";
import { PageActions } from "@/shared/components/PageActions";
import { preventSubmit } from "@/lib/utils";

import { updateFormField } from "../forms";
import { useFormData } from "./useFormData";
import { Questions } from "./Questions";
import { SendDialog } from "./SendDialog";

const Header = () => (
    <PageActions backTo={{ url: "/workspace", label: "Workspace" }} pageTitle="Formulaire" >
        <SendDialog />
    </PageActions >
)

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

const DescriptionSection = ({ control }) => (
    <FormField
        control={control}
        name="description"
        render={({ field }) => (
            <FormItem>
                <FormLabel>
                    <IconTooltip icon="info" label="Description" title="Bon à savoir!" message="Ce texte sera inclus dans le courriel envoyé aux destinataires de ce formulaire." />
                </FormLabel>
                <FormControl>
                    <ReactQuill {...field}></ReactQuill>
                </FormControl>
            </FormItem>
        )}
    />
)

const QuestionsSection = ({ formId, questions }) => (
    <FormItem className="text-center">
        <FormLabel>Dates de disponibilités</FormLabel>
        <FormControl>
            <Questions formId={formId} questions={questions} />
        </FormControl>
    </FormItem>
)

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
            <Header />

            <Form {...form}>
                <form
                    className="flex flex-col gap-5"
                    onSubmit={form.handleSubmit(preventSubmit)}>
                    <TitleSection control={form.control} />
                    <DescriptionSection control={form.control} />
                    <QuestionsSection formId={formId} questions={formData.questions} />
                </form>
            </Form >
        </div >
    )
}