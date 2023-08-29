import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from "@/shadcn-components/ui/button"
import {
  Form,
} from "@/shadcn-components/ui/form"

import { TextInput } from './TextInput';

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email()
});

function ProfileForm({ username, email }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username,
      email
    },
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <TextInput fieldName='username' control={form.control} />
        <TextInput fieldName='email' control={form.control} />
        <Button type="submit" variant='secondary'>Submit</Button>
      </form>
    </Form>
  );
}
export { ProfileForm }