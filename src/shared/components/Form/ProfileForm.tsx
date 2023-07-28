import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { TextInput } from './Input';

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

function ProfileForm({ username }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username,
    },
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <TextInput fieldName='username' control={form.control} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
export { ProfileForm }