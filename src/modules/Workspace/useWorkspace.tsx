import { useState } from "react";

import { initLC } from "@/lib/utils";
import { getForm, getFormIds, getForms } from "./forms";

export function useWorkspace() {
    initLC();
    const [formIds, setFormIds] = useState(getFormIds());
    const [forms, setForms] = useState(getForms());
    return { formIds, forms };
}