import { useState } from "react";
import { useNavigate } from "react-router";

import { deleteForm, getFormIds, create as newId } from "./forms";
import { useWorkspace } from "./useWorkspace";

import { Header } from "./Header";
import FormCard from "./FormCard";
import AddCard from "./AddCard";

export const Workspace = () => {

    const { formIds, forms, setFormIds } = useWorkspace();
    const navigate = useNavigate();
    const handleNewForm = () => navigate("/workspace/form/" + newId());
    const handleDeleteForm = ({ formId }) => setFormIds(() => {
        deleteForm({ formId });
        return getFormIds();
    });

    const { forms, create, remove } = useFormsStore();

    const handleNewForm = () => {
        const id = uuid();
        create(id);
        navigate("/workspace/form/" + id)
    };

    const handleDeleteForm = (id: string) => {
        remove(id);
    }

    const formFilter = form => forms[form.id].title?.toLowerCase().includes(searchTerm?.toLowerCase())

    const handleSearch = (search) => {
        console.log("🚀 ~ file: Workspace.tsx:32 ~ handleSearch ~ search:", search)
        setSearchTerm(search)
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