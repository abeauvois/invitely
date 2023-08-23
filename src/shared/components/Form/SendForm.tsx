import React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"

import { TextInput } from './TextInput';
import { SelectInput, SelectOption } from './SelectInput';
import { RichTextInput } from '@/modules/Workspace/WorkspaceForm/RichTextInput';
import { useNavigate } from 'react-router';
import { PageActions } from '../PageActions';


const defaultRecipients: SelectOption[] = [
  { value: 'abeauvois@gmail.com', label: 'alex: abeauvois@gmail.com' },
  { value: 'boostup@gmail.com', label: 'fred' },
];

const recipientSchema = z.object({
  value: z.string().email().nonempty(),
  label: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }).optional(),
});

const recipientsSchema = z.array(recipientSchema).min(1, {
  message: "You must have at least one recipient.",
})

const emailingSchema = z.object({
  recipients: recipientsSchema,
  subject: z.string().min(2, {
    message: "Subject must be at least 2 characters.",
  }),
  message: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
});

const Header = () => {
  const navigate = useNavigate();
  return (
    <PageActions backTo={{ url: "/workspace", label: "Workspace" }} pageTitle="Destinataires" >
      <Button variant="primary" onClick={() => navigate("/workspace/send")}>
        Envoyer
      </Button>
    </PageActions >
  )
}

type SendFormProps = { recipients?: SelectOption[] }

function SendForm({ recipients = defaultRecipients }: SendFormProps) {
  const [recipientsOptions, setRecipientsOptions] = React.useState<SelectOption[]>(defaultRecipients);

  const form = useForm({
    resolver: zodResolver(emailingSchema),
    defaultValues: {
      recipients: recipientsOptions,
      subject: 'your subject',
      message: 'your message',
    },
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <section className="page">
      <Header />
      <div className="mx-auto max-w-7xl px-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <SelectInput fieldName='recipients' control={form.control} defaultOptions={recipientsOptions} />
            <TextInput fieldName='subject' control={form.control} />
            <RichTextInput fieldName='message' control={form.control} />
            <Button type="submit" variant='secondary'>Envoyer</Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
export { SendForm }