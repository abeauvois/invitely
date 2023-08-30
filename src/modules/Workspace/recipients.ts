import { getDbData, setDbData } from "@/utils";

export const getRecipients = async () => await getDbData({ location: "/recipients" });
export const getRecipient = async ({ recipientId }) => await getDbData({ location: `/recipients/${recipientId}` })

export const create = async ({ emailAddress }) => {

    const recipientId = emailAddress.replace(".", "---dot---"); // `.` the dot char is not valid by firebase rules
    await setDbData({
        location: `/recipients/${recipientId}/emailAddress`,
        toStore: emailAddress
    });
    return recipientId;
}