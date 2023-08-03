import { useEffect, useState } from "react";

import { initLC } from "@/lib/utils";
import { deleteForm, getFormIds, getForms } from "./forms";

export function useWorkspace() {
    initLC();
    const [formIds, setFormIds] = useState(getFormIds());
    const [forms, setForms] = useState(getForms());

    return { formIds, forms, setFormIds };
}