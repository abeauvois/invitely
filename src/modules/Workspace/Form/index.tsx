import { useParams } from "react-router";
import { useEffect, useState } from "react";

import { getFormQuestions, updateFormQuestions } from "./forms";

import { Switch } from "@/components/ui/switch";
import Toolbar from "./Toolbar";

export default () => {

    const { formId } = useParams();
    const [dates, setDates] = useState(new Set(getFormQuestions({ formId })));

    const addDate = (date) => {
        setDates(prevDates => new Set(prevDates).add(date?.toDateString()));
    }

    useEffect(()=> {
        updateFormQuestions({ formId, questions: Array.from(dates) });
    },[dates]);

    return (

        <div className="page">
            <Toolbar onSelectDate={addDate} />
            <section>
                Title: {formId}
            </section>
            <section className="mx-auto max-w-xs flex flex-col auto-rows-min p-5">
                <ul>
                    {Array.from(dates)
                        .sort((a, b) => new Date(a) - new Date(b))
                        .map((date, i) => (
                            <li key={i} className="flex justify-between">
                                {new Date(date).toLocaleDateString()}
                                <span className="flex items-center space-x-2">
                                    <Switch />
                                </span>
                            </li>
                        ))}
                </ul>
            </section>
        </div>
    )
}