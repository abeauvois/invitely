import uuid from "react-uuid";

import { getLC, setLC } from "@/utils";

export const getRecipients = async () => await getLC({ location: "/recipients" });
export const getRecipient = async ({ recipientId }) => await getLC({ location: `/recipients/${recipientId}` })

export const create = ({ recipientId = uuid(), emailAddress }) => {

    setLC({
        ...getLC(),
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