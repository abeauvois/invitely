import type { BackgroundHandler, HandlerEvent } from "@netlify/functions";

type Context = {
  content: string;
  destination: string;
};


// ------------------- BREVO -------------------
import * as SibApiV3Sdk from '@sendinblue/client'

const apiInstance = new SibApiV3Sdk.ContactsApi()
const sendinblueApiKey = process.env.VITE_SENDINBLUE_BREVO_API_KEY

// Configure API key authorization: apiKey
apiInstance.setApiKey(SibApiV3Sdk.ContactsApiApiKeys.apiKey, sendinblueApiKey!)

const limit = 10 // Number | Number of documents per page
const offset = 0 // Number | Index of the first document of the page

const handler: BackgroundHandler = async (event: HandlerEvent) => {
  if (!event.body) {
    return;
  }

  const { content, destination } = JSON.parse(event.body) as Context;

  console.log(`Sending email to ${destination}`);


  apiInstance.getLists(limit, offset).then(
    function (data) {
      console.log('API called successfully. Returned data: ', data.body)
      apiInstance.getAttributes().then(
        function (data) {
          console.log('API called successfully. Returned data: ', data.body)
        },
        function (error) {
          console.error(error)
        }
      )
    },
    function (error) {
      console.error(error)
    }
  )

};

// ------------------- BREVO END -------------------




export { handler };
