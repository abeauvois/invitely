import { getLC, setLC } from "@/lib/utils";
import uuid from "react-uuid";


export function create (formData) {
    setLC({
        forms: [
            {
                id: uuid(),
                title: formData.title,
                questions: [formData.questions],
                answers: []
            }
        ]
    });
}

export const getForms = () => (getLC().forms);