"use client";
import { ComponentProps, PropsWithChildren } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Markdown } from "@/components/markdown";

export function ManualDialog({
  children,
  open,
  onOpenChange,
}: PropsWithChildren<Partial<ComponentProps<typeof Dialog>>>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <Markdown className="prose-sm max-h-[300px] overflow-y-scroll">
          {`## Open Source multiplier

The Open source multiplier takes your allocation and multiplies its effects across open source projects. Here are the conditions for a project to qualify for the open source multiplier

1. **Open Source License**: All GitHub repositories which a project has provided and labeled as containing contract code must have an open source license as defined by the [Open Source Initiative](https://opensource.org/).
2. **Public Repositories**: For a project to qualify, their repos which contain contract code had to be created before May 1st 2024. 

**Risks & edge cases**

- **Mixture of licenses**: A project is considered open source only if all licenses for their contract code are open source. Projects using a mix of closed and open source licenses are not eligible.
- **Github repo not containing full contract code**: While the application review process aimed to ensure that only applications qualify which made their code available via a public github repo, there is no guarantee that the code in the repo matches the code deployed onchain.
- **Unlicensed code:** Projects were informed that a license file is required to qualify for additional rewards. Unlicensed code is not considered open source.`}
        </Markdown>
      </DialogContent>
    </Dialog>
  );
}
