import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { LoaderFunction, useLoaderData } from "react-router-typesafe";
import { FormProvider, useForm } from 'react-hook-form';


import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { setMailingList, getForm, lockFormEdition } from '../forms';
import { create } from '../recipients';

import { Button } from "@/shadcn-components/ui/button"
import Modal from '@/shared/components/Modal';

import { TextInput } from '@/shared/components/Form/TextInput';
import { SelectInput } from '@/shared/components/Form/SelectInput';
import { RichTextInput, notEqualToPBrP } from '@/modules/Workspace/WorkspaceForm/RichTextInput';
import { PageActions } from '@/shared/components/PageActions';

// @TODO: must fix this: putting a non valid email address in the SelectInput field
// brings an "undefined" error message instead of "Adresse email invalide"
// there might be a clue to solving this here: https://stackoverflow.com/questions/76817944/zod-get-nested-object-inside-array-field-errors
const recipientSchema = z.object({
  value: z.string().email({ message: "Adresse email invalide" }),
  label: z.string().optional(),
});

const recipientsSchema = z.array(recipientSchema).min(1, {
  message: "Veuillez saisir au moins 1 destinataire",
})

const emailingSchema = z.object({
  recipients: recipientsSchema,
  subject: z.string().nonempty({
    message: "Le sujet est obligatoire",
  }),
  message: z.string().refine(notEqualToPBrP, {
    message: "Le corps du mail est obligatoire",
  })
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
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const formProviderMethods = useForm({
    resolver: zodResolver(emailingSchema),
    defaultValues: {
      recipients: formDataDefault.mailingList,
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

      // @TODO
      // At this point, an email must be sent to each recipient
      // Each must click on the custom link to then actually fill out the workspace form
      const devLogString = ` \tto:${value} 
                 \n \tsubject:${subject}
                 \n \tmessage (as HTML): \n ${message} 
                 <a href="${baseUrl}/workspace/form/${formId}/${recipientId}" rel="noopener noreferrer" target="_blank">Répondre au questionnaire</a></p> 
                `;
      console.log(devLogString)
    });

    await setMailingList({ formId, mailingList: recipients });
    await lockFormEdition({ formId });
    setShowModal(true);

  };

  return (
    <section className="page">
      <Header label={formDataDefault.title} backToUrl={`/workspace/form/${formId}`} />
      <FormProvider {...formProviderMethods}>
        <form onSubmit={formProviderMethods.handleSubmit(onSubmit)} className="space-y-8">
          <SelectInput
            fieldLabel='Destinataires'
            fieldName='recipients'
            control={formProviderMethods.control}
            defaultOptions={formDataDefault.mailingList} />
          <TextInput
            fieldLabel='Sujet'
            fieldName='subject'
            control={formProviderMethods.control} />
          <RichTextInput
            fieldLabel='Corps du mail'
            fieldName='message'
            control={formProviderMethods.control} />
          <Button
            type="submit"
            variant='primary'>Envoyer</Button>
          <Modal
            alertMode
            isOpen={showModal}
            title="Confirmation d'envoie"
            description="Le formulaire vient d'être envoyé aux destinataires indiqués."
            confirmationText="Ok"
            onConfirm={() => navigate("/workspace")}
            closeModal={() => { }}
          />
        </form>
      </FormProvider>
    </section>
  );
}
export { MailingComposer }