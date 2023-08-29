import uuid from "react-uuid";

import { getDbData, setDbData } from "@/utils";

export const getRecipients = async () => await getDbData({ location: "/recipients" });
export const getRecipient = async ({ recipientId }) => await getDbData({ location: `/recipients/${recipientId}` })

export const create = ({ recipientId = uuid(), emailAddress }) => {

    setDbData({
        ...getDbData(),
        recipients: {
            ...getRecipients(),
            [recipientId]: {
                emailAddress,
                lastName: "",
                firstName: "",
            }
        }
    });

    return recipientId;
}