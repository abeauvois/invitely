import uuid from "react-uuid";

import { getLC, setLC } from "@/lib/utils";

export const getForms = () => getLC().forms;
export const getFormIds = () => Object.keys(getForms());
export const getForm = ({ formId }) => getForms()[formId];

export function create() {

    const formId = uuid();

    setLC({
        forms: {
            ...getForms(),
            [formId]: {
                creationDate: new Date().toLocaleDateString(),
                title: `title for ${formId}`,
                description: "",
                questions: [],
                answers: []
            }
        }
    });

    return formId;
}

export const updateFormField = ({ formId, field: { name, val } }) => {
    const form = getForm({ formId });
    setLC({
        forms: {
            ...getForms(),
            [formId]: {
                ...form,
                [name]: val,
            }
        }
    })
}
