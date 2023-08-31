import uuid from "react-uuid";

import { getDbData, setDbData } from "@/utils";
import { setRecipient } from "./recipients";

export const dateToString = (date = Date.now()) => new Date(date).toISOString().split('T')[0]

export const getForms = async () => await getDbData({ location: "/forms" });
export const getFormIds = async () => Object.keys(await getForms());
export const getForm = async ({ formId }) => await getDbData({ location: `/forms/${formId}` });

export async function create() {

    const formId = uuid();
    const now = { date: dateToString() };

    await setDbData({
        location: `/forms/${formId}`,
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

export const deleteForm = async ({ formId }) => {
    setDbData({ location: `/forms/${formId}`, toStore: null })
}

export const updateFormField = ({ formId, field: { name, val } }) => {
    setDbData({ location: `/forms/${formId}/${name}`, toStore: val });
}

export const getFormQuestions = async ({ formId }) => {
    return getDbData({ location: `/forms/${formId}/questions` });
}

export const getQuestion = ({ questions, questionId }) => {
    return questions.find(({ id, date }) => id === questionId);
}

export const getRecipientAnswers = async ({ formId, recipientId }) => {
    const questions = await getFormQuestions({ formId });
    let answers = await getDbData({ location: `/forms/${formId}/answers/${recipientId}` });
    if (!answers) { //handling the case where recipients has not replied yet
        answers = { questions: questions.map(({ id }) => ({ [id]: false })) };
    }

    return answers.questions.map((item, i) => {
        const [questionId] = Object.keys(item);
        const { date } = getQuestion({ questions, questionId })
        return { id: questionId, date, answer: item[questionId] };
    });
}

export const setRecipientAnswers = async ({
    formId,
    recipientId,
    recipientAnswers }) => {
    await setDbData({
        location: `/forms/${formId}/answers/${recipientId}/`,
        toStore: {
            answerDate: dateToString(),
            questions: recipientAnswers.map(({ id, answer }) => {
                return ({ [id]: answer })
            })
        }
    })
}