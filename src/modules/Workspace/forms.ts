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
        ...getLC(),
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
        ...getLC(),
        forms: {
            ...getForms(),
            [formId]: {
                ...form,
                [name]: val,
            }
        }
    })
}

export const getQuestion = ({ questions, questionId }) => {
    return questions.find(({ id, date }) => id === questionId);
}

export const getRecipientAnswers = ({ formId, recipientId }) => {
    const { questions, answers } = getForm({ formId });
    return answers[recipientId].questions.map((item, i) => {
        const [questionId] = Object.keys(item);
        const { date } = getQuestion({ questions, questionId })
        return { date, answer: item[questionId] };
    });
}

