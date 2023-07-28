import React from 'react';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from 'react-hook-form';

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
            <Input {...field} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}