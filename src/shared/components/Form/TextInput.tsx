import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn-components/ui/form"
import { Input } from "@/shadcn-components/ui/input"

interface TextInputProps {
  control: UseFormReturn<any>['control'];
  fieldLabel?: string;
  fieldName: string;
  fieldValue?: string;
  description?: string;
  disabled?: boolean;
}

export function TextInput({ control, fieldLabel, fieldName, description, disabled }: TextInputProps) {

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{fieldLabel || fieldName}</FormLabel>
          <FormControl>
            <Input {...field} disabled={disabled} type='text' />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}