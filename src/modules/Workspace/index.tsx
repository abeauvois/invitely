import { create, getForms } from "./forms";

import Header from "./Header";
import FormCard from "./FormCard";
import AddCard from "./AddCard";
import { setLC } from "@/lib/utils";

export const Workspace = () => {

    //@TODO: remove this temporary code
    setLC({"forms":[{"id":"637eba71-6e3a-5402-2ea8-4fe869d0a70d","title":"Festival Musique en Vacances","questions":[null],"answers":[]},{"id":"637eba71-6e3a-5402-2ea9","title":"Festival 2","questions":[null],"answers":[]},{"id":"637eba71-6e3a-5402-2ea10","title":"Festival 3","questions":[null],"answers":[]}]})

    const forms = getForms();
    return (
        <section className="bg-black">
            <Header />
            <ul className="bg-slate-50 p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 text-sm leading-6">
                {forms.map((form, i) => (
                    <FormCard key={i} form={form} />
                ))}
            <AddCard />
            </ul>
        </section>
    )
}