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
  fieldName: string;
  fieldValue?: string;
  description?: string;
}

export function TextInput({ control, fieldName, description }: TextInputProps) {

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{fieldName}</FormLabel>
          <FormControl>
            <Input {...field} type='text' />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}