import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toLocaleDateString, updateFormField } from "../forms";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { AddButton } from "./AddButton";
import { DeleteButton } from "@/shared/components/Buttons/DeleteButton";
import { ArrowUpIcon, ArrowDownIcon, CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export const Questions = ({ formId, questions }) => {

    const fieldArrayName = "dates";

    const { control, register } = useForm();

    const { fields, prepend, append, update, remove, swap } = useFieldArray({
        control,
        name: fieldArrayName,
    });

    const onPrependDate = () => {
        prepend({ date: toLocaleDateString(new Date()) })
    }

    const onAppendDate = () => {
        append({ date: toLocaleDateString(new Date()) })
    }

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
        <section className="mx-auto max-w-lg flex flex-col">
            <AddButton onClick={onPrependDate} />
            <ul className="max-w-md mx-auto">
                {fields
                    .map((field, index) => {
                        return (
                            <li key={field.id} className="p-2 flex items-center justify-items-stretch">
                                <span className="flex w-24 justify-start">
                                    {/* MOVE UP */}
                                    {index > 0 && index <= fields.length - 1 ? (
                                        <Button
                                            type="button"
                                            onClick={() => swap(index, index - 1)}>
                                            <ArrowUpIcon />
                                        </Button>
                                    ) : (<div ></div>)}

                                    {/* MOVE DOWN */}
                                    {index >= 0 && index < fields.length - 1 ? (
                                        <Button
                                            type="button"
                                            onClick={() => swap(index, index + 1)}>
                                            <ArrowDownIcon />
                                        </Button>
                                    ) : (<div></div>)}
                                </span>

                                <Popover>
                                    <PopoverTrigger className="w-34 flex items-center">
                                        <CalendarIcon className="w-10 h-10"/>
                                        <Input
                                            placeholder="saisir une date"
                                            {...register(`${fieldArrayName}[${index}].date`)}
                                        >
                                        </Input>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <Calendar
                                            mode="single"
                                            defaultMonth={field["date"] ? new Date(field["date"]) : new Date()}
                                            selected={new Date(field["date"])}
                                            onSelect={(date) => onDateUpdate(index, date)}
                                        />
                                    </PopoverContent>
                                </Popover>

                                <span className="flex">
                                    {/* REMOVE */}
                                    <DeleteButton onDelete={() => remove(index)} />
                                </span>
                            </li>
                        )
                    })}
            </ul>
            <AddButton onClick={onAppendDate} />
        </section>
    )
}