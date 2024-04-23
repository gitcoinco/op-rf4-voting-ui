import { ComponentProps } from "react";
import { Button as UIButton } from "../ui/button";
import { ArrowUpRight, LucideIcon } from "lucide-react";

export function Button({
  children,
  icon: Icon,
  iconSide = "left",
  ...props
}: {
  icon?: LucideIcon;
  iconSide?: "left" | "right";
} & ComponentProps<typeof UIButton>) {
  return (
    <UIButton {...props}>
      {Icon && iconSide === "left" && <Icon className="mr-2 size-4" />}
      {children}
      {Icon && iconSide === "right" && <Icon className="ml-2 size-4" />}
    </UIButton>
  );
}
