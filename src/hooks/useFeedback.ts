import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import ky from "ky";
import { z } from "zod";

const FormSchema = z.object({
  address: z.string(),

  votingTime: z.string(),

  votingRating: z.string(),

  behaviors: z.any(),
  behaviorsComment: z.string(),

  concernRating: z.string(),
  concernComment: z.string().optional(),

  confidenceRating: z.string(),
  confidenceComment: z.string().optional(),

  trustRating: z.string(),
  trustComment: z.string().optional(),

  satisfactionRating: z.string(),
  satisfactionComment: z.string().optional(),

  knowledgeRating: z.string(),
  knowledgeComment: z.string().optional(),

  understandableRating: z.string(),
  understandableComment: z.string().optional(),

  confidence_dataRating: z.string(),
  confidence_dataComment: z.string().optional(),
});

export type FeedbackForm = z.infer<typeof FormSchema>;

const formMap: FeedbackForm = {
  address: "2c6d3d4d-282c-4b51-b98f-149d08506a9a",
  votingTime: "ae3f9f44-09a6-4b97-8a03-a77516c09928",

  votingRating: "4157c065-3a70-483d-9f04-413f7a87f847",

  behaviors: {
    id: "505b462d-1d03-4799-9402-8a78f8afe56c",
    choiceRefs: {
      collusion: "85f58f02-0b56-494d-8dfc-b9d899f7fbed",
      bribery: "05ec7e72-d0fc-4719-9a7a-4196fb7c4890",
      "self-dealing": "0d8fa526-1895-4fa0-88d1-c2007ad2cc0d",
      other: "fa6957e5-5387-48bf-9df8-ac213f1a66f0",
      none: "cf274617-880d-46da-bdb1-48732f670f9c",
    },
  },
  behaviorsComment: "fa87855f-c32d-46d2-a74f-c35b969faf71",

  concernRating: "43838dec-73b8-443e-ab28-4de302464fc4",
  concernComment: "f1baaa76-41fc-41cb-ad54-af0862bdbe2d",

  confidenceRating: "53a46a50-8509-4ea9-9447-f9b9af69640d",
  confidenceComment: "7d8b601f-7006-4257-864b-1198ddb09738",

  satisfactionRating: "12aa8f2f-6d5f-42e6-8dc1-4a953b9fc108",
  satisfactionComment: "5e0537e6-a015-40b4-afe1-da3bfb33ddf7",

  trustRating: "111081c3-1e00-45e6-a44e-b5a39cf7686e",
  trustComment: "bb98056f-6124-4a61-8d31-7eb7d33ab1ad",

  knowledgeRating: "197b7513-af02-4c88-8d9d-353c44700251",
  knowledgeComment: "902cf640-2552-4f01-9a47-48b008807dfa",

  understandableRating: "12aa8f2f-6d5f-42e6-8dc1-4a953b9fc108",
  understandableComment: "d50c6122-5710-4751-86fa-ed5eda08aeaa",

  confidence_dataRating: "87711975-c145-44a5-942f-da92b01bf075",
  confidence_dataComment: "8ff56e2e-ca11-4cc8-9d09-2c3a98ffbe39",
} as const;

async function sendFeedback(feedback: FeedbackForm) {
  const addFormResponseItems = Object.entries(formMap).map(
    ([key, formFieldId]) => {
      const value = feedback[key as keyof typeof formMap];
      return {
        formFieldId: formFieldId?.id ?? formFieldId,
        inputValue: formFieldId?.choiceRefs
          ? {
              choiceRefs: value?.map(
                (behavior: string) => formFieldId.choiceRefs[behavior]
              ),
            }
          : { default: value },
      };
    }
  );
  return ky
    .post(`/api/deform`, {
      json: {
        operationName: "AddFormResponse",
        variables: {
          data: {
            formId: "5dabe093-8c29-4e70-a0c3-01bef72ac2c1",
            addFormResponseItems,
          },
        },
        query:
          "mutation AddFormResponse($data: AddFormResponseInput!) { addFormResponse(data: $data) { id } }",
      },
    })
    .json<{ errors?: { message: string }[] }>()
    .then((r) => {
      if (r.errors?.length) {
        throw new Error(r.errors?.[0]?.message);
      }
      return r;
    });
}

export function useSendFeedback() {
  const { toast } = useToast();
  return useMutation({
    mutationFn: sendFeedback,
    onError: (err) => {
      console.error(err);
      toast({ title: "Error submitting feedback", variant: "destructive" });
    },
  });
}
