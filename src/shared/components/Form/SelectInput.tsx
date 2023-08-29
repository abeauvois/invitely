import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn-components/ui/form"

import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';

export type SelectOption = {
  readonly label: string;
  readonly value: string;
};

interface SelectInputProps {
  control: UseFormReturn<any>['control'];
  fieldName: string;
  fieldValue?: string;
  description?: string;
  defaultValue?: SelectOption[];
  defaultOptions?: SelectOption[];
}

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

export function SelectInput({ control, fieldName, description, defaultValue, defaultOptions }: SelectInputProps) {

  const [options, setOptions] = useState(defaultOptions);

  const handleCreate = (inputValue: string) => {
    const newOption = createOption(inputValue);
    // prev can be null, even with defaultOptions, if these options are selected (by default or by user)
    setOptions((prev) => prev ? [...prev, newOption] : [newOption]);
  };

  function handleChange(field: ControllerRenderProps<any, string>) {
    return (value) => {
      field.onChange(value);
    };
  }

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{fieldName}</FormLabel>
          <FormControl>
            <CreatableSelect
              defaultValue={defaultValue}
              isMulti
              isClearable
              name="recipients"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              onCreateOption={handleCreate}
              {...field}
              onChange={handleChange(field)}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );


}