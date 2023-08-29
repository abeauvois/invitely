import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";

import { deleteForm, getForms, getFormIds, create as newId } from "./forms";

import { Header } from "./Header";
import FormCard from "./FormCard";
import AddCard from "./AddCard";

export async function loader() {
    try {
        const formIdsDefaults = await getFormIds();
        const formsDefaults = await getForms();
        return { formIdsDefaults, formsDefaults };
    } catch (error: any) {
        console.log(error);
    }
}

export const Workspace = () => {

    const { formIdsDefaults, formsDefaults } = useLoaderData();

    const [formIds, setFormIds] = useState(formIdsDefaults);
    const [forms, setForms] = useState(formsDefaults);

    const navigate = useNavigate();
    const handleNewForm = () => navigate("/workspace/form/" + newId());
    const handleDeleteForm = ({ formId }) => setFormIds(() => {
        deleteForm({ formId });
        return getFormIds();
    });

    const handleSearch = (searchTerm) => {
        setFormIds(
            getFormIds().filter(
                formId => forms[formId].title?.toLowerCase()
                    .includes(searchTerm?.toLowerCase())
            )
        );
    };

    return (
        <section className="page">
            <Header onNewForm={handleNewForm} onSearch={handleSearch} />
            <ul className="p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 text-sm leading-6">
                {formIds.map((formId, i) => (
                    <FormCard
                        key={formId}
                        to={`/workspace/form/${formId}/`}
                        label={forms[formId].title}
                        onDelete={() => handleDeleteForm({ formId })} />
                ))}
                <AddCard onNewForm={handleNewForm} />
            </ul>
        </section>
    )
}