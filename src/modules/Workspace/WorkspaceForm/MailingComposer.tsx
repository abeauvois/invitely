import React from 'react';
import { LoaderFunction, useLoaderData } from "react-router-typesafe";
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from "@/shadcn-components/ui/button"
import {
  Form,
} from "@/shadcn-components/ui/form"

import { TextInput } from '../../../shared/components/Form/TextInput';
import { SelectInput, SelectOption } from '../../../shared/components/Form/SelectInput';
import { RichTextInput } from '@/modules/Workspace/WorkspaceForm/RichTextInput';
import { PageActions } from '../../../shared/components/PageActions';
import { getForm } from '../forms';
import { create } from '../recipients';


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

const Header = ({ label = "Envoie du formulaire", backToUrl }) => {
  return (
    <PageActions backTo={{ url: backToUrl, label: "Workspace" }} pageTitle={label} >
    </PageActions >
  )
}

export const loader = (async ({ params }) => {
  const { formId } = params;
  const formDataDefault = await getForm({ formId });
  return { formId, formDataDefault };
}) satisfies LoaderFunction

function MailingComposer() {
  const { formId, formDataDefault } = useLoaderData<typeof loader>();
  const [recipientsOptions, setRecipientsOptions] = React.useState<SelectOption[]>(defaultRecipients);

  const form = useForm({
    resolver: zodResolver(emailingSchema),
    defaultValues: {
      recipients: recipientsOptions,
      subject: formDataDefault.title,
      message: formDataDefault.description,
    },
  });

  const onSubmit = async ({ subject, message, recipients }) => {
    recipients.forEach(async ({ value, label }) => {
      const recipientId = await create({ emailAddress: value });
      const hostname = window.location.hostname;
      let baseUrl = `${window.location.protocol}//${hostname}`;
      if (process.env.NODE_ENV === "development") {
        baseUrl += `:${window.location.port}`
      }

      console.log(` \tto:${value} 
                 \n \tsubject:${subject}
                 \n \tmessage (as HTML): \n ${message} 
                 <a href="${baseUrl}/workspace/form/${formId}/${recipientId}" rel="noopener noreferrer" target="_blank">Répondre au questionnaire</a></p> 
                `)

    });
    // @TODO
    // At this point, an email must be sent to each recipient
    // A link must be included in the mail so they can 
    // click on it to then actually fill out the workspace form
    // with their answers:

  };

  return (
    <section className="page">
      <Header label={formDataDefault.title} backToUrl={`/workspace/form/${formId}`} />
      <div className="mx-auto max-w-7xl px-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <SelectInput fieldLabel='Destinataires' fieldName='recipients' control={form.control} defaultOptions={recipientsOptions} />
            <TextInput fieldLabel='Sujet' fieldName='subject' control={form.control} />
            <RichTextInput fieldLabel='Corps du mail' fieldName='message' control={form.control} />
            <Button type="submit" variant='primary'>Envoyer</Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
export { MailingComposer }