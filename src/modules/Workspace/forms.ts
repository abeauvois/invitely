import uuid from "react-uuid";

import { getLC, removeKey, setLC } from "@/lib/utils";

export const dateToString = (date = Date.now()) => new Date(date).toISOString().split('T')[0]

export const getForms = async () => await getLC({ location: "/forms" });
export const getFormIds = async () => Object.keys(await getForms());
export const getForm = async ({ formId }) => await getLC({ location: `/forms/${formId}` });

export function create() {

    const formId = uuid();
    const now = { date: dateToString() };

    setLC({
        location: `/forms${formId}`,
        toStore: {
            creationDate: dateToString(),
            title: `title for ${formId}`,
            description: "",
            questions: [now, now, now],
            answers: []
        }
    });

    return formId;
}

export const deleteForm = ({ formId }) => {
    const forms = getForms();
    // setLC({ forms: removeKey(formId, forms) });
}

export const updateFormField = ({ formId, field: { name, val } }) => {
    const form = getForm({ formId });
    // setLC({
    //     ...getLC(),
    //     forms: {
    //         ...getForms(),
    //         [formId]: {
    //             ...form,
    //             [name]: val,
    //         }
    //     }
    // })
}

export const getQuestion = ({ questions, questionId }) => {
    return questions.find(({ id, date }) => id === questionId);
}

export const getRecipientAnswers = async ({ formId, recipientId }) => {
    const questions = await getLC({ location: `/forms/${formId}/questions` })
    const answers = await getLC({ location: `/forms/${formId}/answers/${recipientId}` })

    return answers.questions.map((item, i) => {
        const [questionId] = Object.keys(item);
        const { date } = getQuestion({ questions, questionId })
        return { id: questionId, date, answer: item[questionId] };
    });
}

