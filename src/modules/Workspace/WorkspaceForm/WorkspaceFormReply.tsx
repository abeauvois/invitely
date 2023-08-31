import { useLoaderData } from "react-router";
import { useFieldArray, useForm } from "react-hook-form";

import { PageActions } from "@/shared/components/PageActions";
import { Button } from "@/shadcn-components/ui/button";
import { Switch } from "@/shadcn-components/ui/switch";
import { getForm, getRecipientAnswers, setRecipientAnswers } from "../forms";
import { getRecipient, setRecipient } from "../recipients";
import { useState } from "react";

const Header = ({ title }) => {
    return (

        <PageActions pageTitle={title} className="fixed top-0 left-0 z-50 bg-white pt-4 pr-4 pb-0 pl-0 w-full items-center" >
            <Button type="submit" variant="primary" >Envoyer</Button>
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
        <input
            required
            {...lastNameProps}
            placeholder="Clark"
        />
        <label htmlFor="firstName">Prénom</label>
        <input
            required
            {...firstNameProps}
            placeholder="Gable"
        />
    </Section>
)

const DescriptionSection = ({ content }) => (
    <Section dangerouslySetInnerHTML={{ __html: content }} />
)

const AnswersSection = ({ questions, onChange }) => {
    return (
        <Section>
            {
                questions.map((question, index) => (
                    <div
                        key={question.id}
                        className="m-auto flex max-w-sm justify-around items-center"
                    ><span><input type="date" value={question.date} disabled /></span>
                        <Switch
                            checked={question.answer}
                            onCheckedChange={(val) => onChange({ index, val })}
                        />
                    </div>
                ))
            }
        </Section >
    )
}

export async function loader({ params }) {
    const { formId, recipientId } = params;
    const workspaceFormData = await getForm({ formId });
    const recipientData = await getRecipient({ recipientId });
    const recipientAnswers = await getRecipientAnswers({ formId, recipientId });
    return { formId, recipientId, workspaceFormData, recipientData, recipientAnswers };
}

export const WorkspaceFormReply = () => {

    const {
        formId,
        recipientId,
        workspaceFormData,
        recipientData,
        recipientAnswers
    } = useLoaderData();

    const { register, getValues } = useForm({
        defaultValues: {
            lastName: recipientData.lastName,
            firstName: recipientData.firstName,
            emailAddress: recipientData.emailAddress,
        }
    });

    const [answers, setAnswers] = useState(recipientAnswers);

    const handleSwitchChange = ({ index, val }) => {
        setAnswers(oldArr => {
            const newArr = [...oldArr];
            newArr[index].answer = val;
            return newArr;
        });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await setRecipientAnswers({
            formId,
            recipientId,
            recipientAnswers: answers
        })
        await setRecipient({ recipientId, toStore: getValues() });
        // @TODO
        //  An email must now be sent to the user:
        // 1) to confirm they've succesfully submitted the form
        // 2) to explain that they can re-use later the same link to edit
        //    the data submitted
        // @TODO
        //  once this line is reached, user must be redirected to a new
        // route to:
        // 1) provide immediate confirmation to the user that the submission of form is done
        // 2) explain that they will receive the email mentioned in previous TODO item.

    };

    return (
        <div className="page">
            <form onSubmit={onSubmit}>
                <Header title={workspaceFormData.title} />
                <DescriptionSection content={workspaceFormData.description} />
                <EmailAddressSection value={recipientData.emailAddress} />
                <NameSection
                    lastNameProps={register("lastName")}
                    firstNameProps={register("firstName")}
                />
                <AnswersSection questions={answers} onChange={handleSwitchChange} />
            </form>
        </ div>
    )
}