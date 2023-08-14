import { useState } from "react";
import { getRecipient } from "./recipients";

export function useRecipientData({ recipientId }) {
    const [recipientData, setRecipientData] = useState(getRecipient({ recipientId }));
    return { recipientData, setRecipientData };
}