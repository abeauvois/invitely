import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { dateToString, updateFormField } from "../forms";

import { Input } from "@/components/ui/input";
import { AddButton } from "./AddButton";
import { DeleteButton } from "@/shared/components/Buttons/DeleteButton";
import { Button } from "@/components/ui/button";
import { BarsArrowDownIcon, BarsArrowUpIcon } from "@heroicons/react/24/outline";

const SwapButton = ({ displayCondition, up = false, down = false, onSwap }) => {
    const props = { className: "w-5 h-5" };
    return (
        <>
            {displayCondition ? (
                <Button
                    type="button"
                    onClick={onSwap}>
                    {up
                        ? <BarsArrowUpIcon {...props} />
                        : <BarsArrowDownIcon {...props} />
                    }
                </Button>
            ) : (<div ></div>)}

        </>
    )
}

export const Questions = ({ formId, questions }) => {

    const fieldArrayName = "dates";
    const { control, register } = useForm();
    const { fields, prepend, append, update, remove, swap } = useFieldArray({
        control,
        name: fieldArrayName,
    });

    const onPrependDate = () => {
        prepend({ date: dateToString(new Date()) })
    }

    const onAppendDate = () => {
        append({ date: dateToString(new Date()) })
    }

    const onDateUpdate = (index, date) => {
        update(index, { date: dateToString(date) })
    };

    useEffect(() => {
        questions.map(date => {
            append({ date: dateToString(date.date) });
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
                            <li key={field.id} className="p-2 flex items-center">
                                <span className="flex w-60">
                                    {/* MOVE UP */}
                                    <SwapButton
                                        up
                                        displayCondition={index > 0 && index <= fields.length - 1}
                                        onSwap={() => swap(index, index - 1)} />

                                    {/* MOVE DOWN */}
                                    <SwapButton
                                        down
                                        displayCondition={index >= 0 && index < fields.length - 1}
                                        onSwap={() => swap(index, index + 1)} />
                                </span>
                                <Input
                                    className="flex"
                                    type="date"
                                    placeholder="saisir une date"
                                    {...register(`${fieldArrayName}[${index}].date`, { valueAsDate: true })}
                                >
                                </Input>

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