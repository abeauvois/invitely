import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { updateFormField } from "./forms";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const toLocaleDateString = (date) => new Date(date).toLocaleDateString()

export const Questions = ({ formId, questions }) => {

    const fieldArrayName = "dates";

    const { control, register } = useForm();

    const { fields, append, prepend, update, remove, swap, move, insert } = useFieldArray({
        control,
        name: fieldArrayName,
        defaultValues: {
            [fieldArrayName]: []
        }
    });

    const onDateUpdate = (index, date) => {
        update(index, { date: toLocaleDateString(date) })
    };

    useEffect(() => {
        questions.map(date => {
            append({ date: toLocaleDateString(date.date) });
        })
    }, []);

    useEffect(() => {
        updateFormField({ formId, field: { name: "questions", val: fields } });
    }, [fields]);


    return (
        <section className="mx-auto flex flex-col">
            <ul>
                {fields
                    .map((field, index) => {
                        return (
                            <li key={field.id} className="p-2 flex items-center justify-between">
                                <Popover>
                                    <PopoverTrigger className="flex-1 max-w-md">
                                        <Input
                                            placeholder="saisir une date"
                                            {...register(`${fieldArrayName}[${index}].date`)}
                                        >
                                        </Input>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <Calendar
                                            mode="single"
                                            defaultMonth={field.date ? new Date(field.date) : new Date()}
                                            selected={new Date(field.date)}
                                            onSelect={(date) => onDateUpdate(index, date)}
                                        />
                                    </PopoverContent>
                                </Popover>

                                <span className="flex">

                                    {/* MOVE UP */}
                                    {index > 0 && index <= fields.length - 1 ? (
                                        <button type="button" onClick={() => swap(index, index - 1)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                                            </svg>
                                        </button>
                                    ) : (<></>)}

                                    {/* MOVE DOWN */}
                                    {index >= 0 && index < fields.length - 1 ? (
                                        <button type="button" onClick={() => swap(index, index + 1)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                                            </svg>
                                        </button>
                                    ) : (<></>)}

                                    {/* REMOVE */}
                                    <button type="button" onClick={() => remove(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </span>
                            </li>
                        )
                    })}
            </ul>
            <Button
                type="button"
                className="btn-primary flex justify-center gap-5"
                onClick={() => {
                    append({ date: toLocaleDateString(new Date()) })
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Nouvelle date
            </Button>
        </section>
    )
}