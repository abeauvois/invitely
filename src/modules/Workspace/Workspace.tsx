import { useState } from "react";
import { useNavigate } from "react-router";

import { deleteForm, getFormIds, create as newId } from "./forms";
import { useWorkspace } from "./useWorkspace";

import { Header } from "./Header";
import FormCard from "./FormCard";
import AddCard from "./AddCard";

export const Workspace = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const navigate = useNavigate();

    const { forms, create, remove } = useFormsStore();

    const handleNewForm = () => {
        const id = uuid();
        console.log("New form id:", id)
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
                {Object.values(forms).filter(formFilter).map((form) => (
                    <FormCard
                        key={form.id}
                        to={`/workspace/form/${form.id}/`}
                        label={forms[form.id].title}
                        onDelete={() => handleDeleteForm(form.id)} />
                ))}
                <AddCard onNewForm={handleNewForm} />
            </ul>
        </section>
    )
}