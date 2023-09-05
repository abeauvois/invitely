import uuid from "react-uuid";
import { getDbData, setDbData } from "@/utils";

export const dateToString = (date = Date.now()) => new Date(date).toISOString().split('T')[0]
export const dateTimeToString = (date = Date.now()) => new Date(date).toISOString()

export const getForms = async () => await getDbData({ location: "/forms" });

export const getFormIds = async () => Object.keys(await getForms() || []);

export const getForm = async ({ formId }) => await getDbData({ location: `/forms/${formId}` });

export async function create(toStore = {
    createdAt: dateTimeToString(),
    sentAt: null,
    title: `un titre`,
    description: "",
    dateList: [
        { id: uuid(), date: dateToString() },
        { id: uuid(), date: dateToString() },
        { id: uuid(), date: dateToString() },
    ],
    mailingList: null,
    submissionList: null
}) {
    const formId = uuid();
    await setDbData({
        location: `/forms/${formId}`,
        toStore
    });

    return formId;
}

export const duplicateForm = async ({ formId }) => {
    const formToDuplicate = await getForm({ formId });
    return await create({
        ...formToDuplicate,
        title: `Copie de ${formToDuplicate.title}`,
        createdAt: dateTimeToString(),
        sentAt: null
    })
}

export const deleteForm = async ({ formId }) => {
    await setDbData({ location: `/forms/${formId}`, toStore: null })
}

export const updateFormField = async ({ formId, field: { name, val } }) => {
    await setDbData({ location: `/forms/${formId}/${name}`, toStore: val });
}

export const setFormDateList = async ({ formId, dateList }) => {
    await updateFormField({ formId, field: { name: "dateList", val: dateList } });
};

export const getFormDateList = async ({ formId }) => {
    return await getDbData({ location: `/forms/${formId}/dateList` });
}

export const getDateFromList = ({ dateList, dateItemId }) => {
    return dateList.find(({ id, date }) => id === dateItemId);
}

export const getRecipientDateList = async ({ formId, recipientId }) => {
    const dateList = await getFormDateList({ formId });
    let recipientSubmission = await getDbData({ location: `/forms/${formId}/submissionList/${recipientId}` });
    if (!recipientSubmission) { //handling the case where recipients has not replied yet
        recipientSubmission = { dateList: dateList.map(({ id }) => ({ [id]: false })) };

    }

    return recipientSubmission.dateList.map((item, i) => {
        const [dateItemId] = Object.keys(item);
        const { date } = getDateFromList({ dateList, dateItemId })
        return { id: dateItemId, date, isPresent: item[dateItemId] };
    });
}

export const setRecipientDateList = async ({
    formId,
    recipientId,
    recipientDateList }) => {

    await setDbData({
        location: `/forms/${formId}/submissionList/${recipientId}/`,
        toStore: {
            submittedAt: dateTimeToString(),
            dateList: recipientDateList.map(({ id, isPresent }) => {
                return ({ [id]: isPresent })
            })
        }
    })
}

export const getMailingListByFormId = async ({ formId }) => await getDbData({ location: `/forms/${formId}/mailingList` })

export const setMailingList = async ({ formId, mailingList }) => {
    await setDbData({
        location: `/forms/${formId}/mailingList`, toStore: mailingList
    })
}

export const lockFormEdition = async ({ formId }) => await setDbData({ location: `/forms/${formId}/sentAt`, toStore: dateTimeToString() })