import uuid from "react-uuid";

import { getLC, setLC } from "@/lib/utils";

export const getForms = () => getLC().forms;
export const getFormIds = () => Object.keys(getForms());
export const getForm = ({ formId }) => getForms()[formId];

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

export const getFormQuestions = ({ formId }) => getForm({formId}).questions;

export const updateFormQuestions = ({ formId, questions }) => {
    const form = getForm({formId});
    setLC({
        forms:  {
            ...getForms(),
            [formId] : {
                ...form,
                questions: questions,
            }
        }
    });
}