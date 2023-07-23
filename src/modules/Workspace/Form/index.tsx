import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";

import { getFormQuestions, updateFormQuestions } from "./forms";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";

export default () => {

    const { formId } = useParams();
    const [dates, setDates] = useState(new Set(getFormQuestions({formId})));

    const addDate = (date) => {
        setDates(prevDates => new Set(prevDates).add(date?.toDateString()));
        updateFormQuestions({formId, questions: Array.from(dates)});
    }

    return (

        <div className="page">
            <section className="page-actions">
                <h2 className="font-semibold text-slate-900">
                    <Link to={"/workspace"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                        </svg></Link>
                </h2>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button className="btn-primary">
                            + Date
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="top-4">
                        <Calendar
                            initialFocus
                            mode="single"
                            // defaultMonth={date?.from}
                            // selected={date}
                            onSelect={addDate}
                        // numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button className="btn-primary">
                            + Plage de dates
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Calendar
                            initialFocus
                            mode="range"
                        // defaultMonth={date?.from}
                        // selected={date}
                        // onSelect={addDate}
                        // numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
                <Button>
                    <a>Envoyer</a>
                </Button>
            </section>
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