import uuid from "react-uuid";

import { getLC, setLC } from "@/lib/utils";

export const getForms = () => getLC().forms;
export const getFormIds = () => Object.keys(getForms());
export const getForm = ({ formId }) => getForms()[formId];
export const getFormQuestions = ({ formId }) => { }

export function create() {

    const formId = uuid();

    setLC({
        forms:  {
            ...getForms(),
            [formId] : {
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

export const updateFormQuestions = ({ formId, questions }) => {
    const forms = getForms();
    for (let i = 0; i < forms.length; i++) {

    }
}