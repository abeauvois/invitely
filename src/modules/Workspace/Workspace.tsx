import { initLC } from "@/lib/utils";

import { create as newId, getForms, getFormIds } from "./WorkspaceForm/forms";

import Header from "./Header";
import FormCard from "./FormCard";
import AddCard from "./AddCard";
import { useNavigate } from "react-router";

export const Workspace = () => {

    initLC();

    const formIds = getFormIds();
    const forms = getForms();

    const navigate = useNavigate();
    const toURL = "/workspace/form/";

    const handleNewForm = () => navigate(toURL + newId());

    return (
        <section className="page">
            <Header onNewForm={handleNewForm} />
            <ul className="p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 text-sm leading-6">
                {formIds.map((formId, i) => (
                    <FormCard key={formId} formId={formId} form={forms[formId]} />
                ))}
                <AddCard onNewForm={handleNewForm} />
            </ul>
        </section>
    )
}