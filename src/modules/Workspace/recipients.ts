import uuid from "react-uuid";

import { getLC, removeKey, setLC } from "@/lib/utils";

export const getRecipients = () => getLC().recipients;
export const getRecipient = ({ recipientId }) => getRecipients()[recipientId]

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