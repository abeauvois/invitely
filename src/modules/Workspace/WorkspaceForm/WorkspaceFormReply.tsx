import { useLoaderData } from "react-router";
import { useForm } from "react-hook-form";

import { PageActions } from "@/shared/components/PageActions";
import { Button } from "@/shadcn-components/ui/button";
import { Switch } from "@/shadcn-components/ui/switch";
import { getForm, getRecipientAnswers } from "../forms";
import { getRecipient } from "../recipients";
import { useState } from "react";

const Header = ({ title }) => {
    return (

        <PageActions pageTitle={title} className="fixed top-0 left-0 z-50 bg-white pt-4 pr-4 pb-0 pl-0 w-full items-center" >
            <Button variant="primary" >Envoyer</Button>
        </PageActions >
    )
}

const Section = ({ className = "", children = null, dangerouslySetInnerHTML = null }) => {
    const _className = "m-4 p-4 max-w-xs m-auto italic";
    return (
        <>
            {children
                ? <section className={`${_className} ${className}`}>
                    {children}
                </section>
                : <section className={`m-4 p-4 ${className}`} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
            }
        </>)
}

const EmailAddressSection = (props) => (
    <Section className={`text-center flex flex-col`}>
        <label htmlFor="userId">Votre addresse e-mail:</label>
        <input
            disabled
            {...props}
        />
    </Section>
)

const NameSection = ({ firstNameProps, lastNameProps }) => (
    <Section className="flex flex-col">
        <label htmlFor="lastName">Nom</label>
        <input required {...lastNameProps} />
        <label htmlFor="firstName">Prénom</label>
        <input required {...firstNameProps} />
    </Section>
)

const DescriptionSection = ({ content }) => (
    <Section dangerouslySetInnerHTML={{ __html: content }} />
)

const AnswersSection = ({ questions }) => {
    return (
        <Section>
            {
                questions.map((question, i) => (
                    <div
                        key={question.id}
                        className="m-auto flex max-w-sm justify-around items-center"
                    ><span><input type="date" value={question.date} disabled /></span> <Switch />
                    </div>
                ))
            }
        </Section >
    )
}

export async function loader({ params }) {
    const { formId, recipientId } = params;
    const formData = await getForm({ formId });
    const recipientDataDefaults = await getRecipient({ recipientId });
    const recipientAnswersDefault = await getRecipientAnswers({ formId, recipientId });
    return { formData, recipientDataDefaults, recipientAnswersDefault };
}

export const WorkspaceFormReply = () => {

    const { formData, recipientDataDefaults, recipientAnswersDefault } = useLoaderData();
    const { control, register, handleSubmit } = useForm({
        defaultValues: {
            lastName: recipientDataDefaults.lastName,
            firstName: recipientDataDefaults.firstName,
            answers: recipientAnswersDefault
        }
    });

    return (
        <div className="page">
            <form>
                <Header title={formData.title} />
                <DescriptionSection content={formData.description} />
                <EmailAddressSection value={recipientDataDefaults.emailAddress} />
                <NameSection lastNameProps={register("lastName")} firstNameProps={register("firstName")} />
                <AnswersSection questions={recipientAnswersDefault} />
            </form>
        </ div>
    )
}