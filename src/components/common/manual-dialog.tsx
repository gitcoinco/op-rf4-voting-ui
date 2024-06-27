"use client";
import { ComponentProps, PropsWithChildren, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Markdown } from "@/components/markdown";
import mixpanel from "mixpanel-browser";

export function ManualDialog({
  children,
  open,
  onOpenChange,
}: PropsWithChildren<Partial<ComponentProps<typeof Dialog>>>) {
  useEffect(() => {
    console.log("mixlanel", open);
    if (open) track();
  }, [open]);

  function track() {
    mixpanel.track("Open Manual");
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger onClick={track}>{children}</DialogTrigger>}
      <DialogContent>
        <Markdown className="prose-sm max-h-[500px] overflow-y-scroll">
          {`## Open Source multiplier

The Open source multiplier takes your allocation and multiplies its effects across open source projects. Here are the conditions for a project to qualify for the open source multiplier

1. **Open Source License**: All GitHub repositories which a project has provided and labeled as containing contract code must have an open source license as defined by the [Open Source Initiative](https://opensource.org/).
2. **Public Repositories**: For a project to qualify, their repos which contain contract code had to be created and public before May 1st 2024   

You can find the data that was used to perform these checks [here](https://docs.google.com/spreadsheets/d/1f6zQCCR2OmaM7bsjVU22YcVP4J_JmLaEKLc-YIDjCkw/edit?gid=88938804#gid=88938804)

**Risks & edge cases**

- **Mixture of licenses**: A project is considered open source only if all licenses for their contract code are open source. Projects using a mix of closed and open source licenses are not eligible.
- **Github repo not containing full contract code**: While the application review process aimed to ensure that only applications qualify which made their code available via a public github repo, there is no guarantee that the code in the repo matches the code deployed onchain.
- **Unlicensed code:** Projects were informed that a license file is required to qualify for additional rewards. Unlicensed code is not considered open source.`}
        </Markdown>
      </DialogContent>
    </Dialog>
  );
}
