import { useState } from "react";
import { getForm } from "../forms";

export function useFormData({ formId }) {
    const [formData, setFormData] = useState(getForm({ formId }));
    return formData;
}