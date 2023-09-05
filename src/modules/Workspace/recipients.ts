import { getDbData, setDbData } from "@/utils";

export const getRecipients = async () => await getDbData({ location: "/recipients" });
export const getRecipient = async ({ recipientId }) => await getDbData({ location: `/recipients/${recipientId}` })

export const create = async ({ emailAddress }) => {

    const recipientId = emailAddress.replaceAll(".", "---dot---"); // `.` the dot char is not valid by firebase rules
    await setDbData({
        location: `/recipients/${recipientId}/emailAddress`,
        toStore: emailAddress
    });
    return recipientId;
}

export const setRecipient = ({ recipientId, toStore }) => setDbData({ location: `/recipients/${recipientId}/`, toStore });