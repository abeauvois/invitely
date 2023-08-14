import { useParams } from "react-router";
import { useFormData } from "./useFormData";
import { PageActions } from "@/shared/components/PageActions";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const sectionClassName = "m-4 p-4";

const Header = ({ title }) => (
    <PageActions pageTitle={title} className="fixed top-0 left-0 z-50 bg-white pt-4 pr-4 pb-0 pl-0 w-full items-center" >
        <Button variant="primary">Envoyer</Button>
    </PageActions >
)

const EmailAddressSection = ({ address }) => (
    <section className={`${sectionClassName} text-center flex flex-col`}>
        <label>Votre addresse e-mail:</label>
        <input value={address} disabled />
    </section>
)

const DescriptionSection = ({ content }) => (
    <section dangerouslySetInnerHTML={{ __html: content }} />
)

const AnswersSection = ({ questions }) => {

    return (
        <section className={sectionClassName}>
            {
                questions.map((question, i) => (
                    <div
                        key={question.id}
                        className="m-auto flex max-w-sm justify-around items-center"
                    ><span><input type="date" value={question.date} disabled /></span> <Switch /></div >
                ))
            }
        </section >
    )
}


export const WorkspaceFormReply = () => {

    const { formId, recipientEmailAddress } = useParams();
    const formData = useFormData({ formId });

    return (
        <div className="page">

            <Header title={formData.title} />
            <DescriptionSection content={formData.description} />
            <EmailAddressSection address={recipientEmailAddress} />
            <AnswersSection questions={formData.questions} />
        </ div>
    )
}