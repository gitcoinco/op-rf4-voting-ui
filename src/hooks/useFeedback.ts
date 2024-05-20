import { useMutation } from "@tanstack/react-query";
import ky from "ky";
import { z } from "zod";

const FormSchema = z.object({
  votingTime: z.string(),

  votingRating: z.string(),
  votingComment: z.string().optional(),

  concernRating: z.string(),
  concernComment: z.string().optional(),

  confidenceRating: z.string(),
  confidenceComment: z.string().optional(),

  satisfactionRating: z.string(),
  satisfactionComment: z.string().optional(),
});

export type FeedbackForm = z.infer<typeof FormSchema>;

const formMap: FeedbackForm = {
  votingTime: "ae3f9f44-09a6-4b97-8a03-a77516c09928",

  votingRating: "4157c065-3a70-483d-9f04-413f7a87f847",
  votingComment: "ec3a1006-83b4-4ea1-80cc-ac6767528224",

  concernRating: "ebc74699-6796-4f87-93b9-86e34099dcfb",
  concernComment: "fa87855f-c32d-46d2-a74f-c35b969faf71",

  confidenceRating: "43838dec-73b8-443e-ab28-4de302464fc4",
  confidenceComment: "f1baaa76-41fc-41cb-ad54-af0862bdbe2d",

  satisfactionRating: "",
  satisfactionComment: "",
} as const;

async function sendFeedback(feedback: FeedbackForm) {
  return ky.post(`https://api.deform.cc/`, {
    json: {
      operationName: "AddFormResponse",
      variables: {
        data: {
          formId: "7e120066-559f-4866-9665-7ce9c8b175bd",
          addFormResponseItems: Object.entries(formMap).map(
            ([key, formFieldId]) => ({
              formFieldId,
              inputValue: {
                default: feedback[key as keyof typeof formMap],
              },
            })
          ),
        },
      },
      query:
        "mutation AddFormResponse($data: AddFormResponseInput!) { addFormResponse(data: $data) { id } }",
    },
  });
}

export function useSendFeedback() {
  return useMutation({
    mutationFn: sendFeedback,
  });
}
