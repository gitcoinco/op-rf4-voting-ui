import { ComponentProps, ComponentType } from "react";
import { Button as UIButton } from "../ui/button";
import { ArrowUpRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Button({
  children,
  icon: Icon,
  iconSide = "left",
  ...props
}: {
  icon?: LucideIcon | ComponentType;
  iconSide?: "left" | "right";
} & ComponentProps<typeof UIButton>) {
  return (
    <UIButton {...props}>
      {Icon && iconSide === "left" && (
        <Icon className={cn("size-4", { ["mr-2"]: children })} />
      )}
      {children}
      {Icon && iconSide === "right" && (
        <Icon className={cn("size-4", { ["ml-2"]: children })} />
      )}
    </UIButton>
  );
}
