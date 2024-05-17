import { format } from "date-fns";
import { CheckCircle, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/headings";
import { Text } from "@/components/ui/text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

const comments = [
  {
    avatarSrc: "",
    name: "shaunlind.eth",
    createdAt: new Date(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    hasAdded: true,
  },
  {
    avatarSrc: "",
    name: "Jx124...243s4",
    createdAt: new Date(),
    content:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum.",
    hasAdded: false,
  },
];

export function Comments() {
  return (
    <div className="bg-gray-100 rounded-3xl p-12 space-y-4">
      <div className="flex justify-between items-center">
        <Heading variant={"h3"}>Comments</Heading>
        <Button icon={Plus} variant="outline">
          Add a comment
        </Button>
      </div>
      <div className="space-y-8">
        {comments.map((comment, i) => (
          <div key={i} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <Avatar>
                  <AvatarImage src={comment.avatarSrc} alt={comment.name} />
                  <AvatarFallback className="bg-gray-300">A</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium">{comment.name}</div>
                  <div className="text-muted-foreground">
                    {format(comment.createdAt, "PPP")}
                  </div>
                </div>
              </div>
              {comment.hasAdded && (
                <div className="text-sm flex gap-2 items-center">
                  <CheckCircle className="size-4 text-success-foreground" />
                  Added to ballot
                </div>
              )}
            </div>
            <Card className="p-4">
              <Text>{comment.content}</Text>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
