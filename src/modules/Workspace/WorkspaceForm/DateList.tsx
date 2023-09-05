import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import uuid from "react-uuid";

import { dateToString, setFormDateList } from "../forms";

import { AddButton } from "./AddButton";
import { DeleteButton } from "@/shared/components/Buttons/DeleteButton";
import { Button } from "@/shadcn-components/ui/button";
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

export const DateList = ({ formId, dateList }) => {

    const fieldArrayName = "dates";
    const { control, register } = useForm({
        defaultValues: {
            [fieldArrayName]: dateList
        }
    });
    const { fields, prepend, append, update, remove, swap } = useFieldArray({
        keyName: "rowId",
        name: fieldArrayName,
        control,
    });

    const createDateRowObject = () => ({ id: uuid(), date: dateToString() })

    const onPrependDate = () => {
        prepend(createDateRowObject())
    }

    const onAppendDate = () => {
        append(createDateRowObject())
    }

    const onDateUpdate = (index, date) => {
        update(index, { id: fields[index]["id"], date })
    };

    useEffect(() => { setFormDateList({ formId, dateList: fields }) }, [fields]);

    return (
        <section className="mx-auto max-w-lg flex flex-col">
            <AddButton onClick={onPrependDate} />
            <ul className="max-w-md mx-auto">
                {fields
                    .map((field, index) => {
                        const { onBlur, ...registerProps } = register(`${fieldArrayName}.${index}.date`);
                        return (
                            <li key={field["id"]} className="p-2 flex items-center">
                                <span className="flex w-32">
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
                                <input
                                    type="date"
                                    className="w-32"
                                    placeholder="saisir une date"
                                    onBlur={(e) => {
                                        onBlur(e);
                                        onDateUpdate(index, e.target.value)
                                    }}
                                    {...registerProps}

                                />

                                <span>
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