import uuid from "react-uuid";

import { getLC, removeKey, setLC } from "@/lib/utils";

export const dateToString = (date = Date.now()) => new Date(date).toISOString().split('T')[0]

export const getForms = () => getLC().forms;
export const getFormIds = () => Object.keys(getForms());
export const getForm = ({ formId }) => getForms()[formId];

export function create() {

    const formId = uuid();
    const now = { date: dateToString() };

    setLC({
        forms: {
            ...getForms(),
            [formId]: {
                creationDate: dateToString(),
                title: `title for ${formId}`,
                description: "",
                questions: [now, now, now],
                answers: []
            }
        }
    });

    return formId;
}

export const deleteForm = ({ formId }) => {
    const forms = getForms();
    setLC({ forms: removeKey(formId, forms) });
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
