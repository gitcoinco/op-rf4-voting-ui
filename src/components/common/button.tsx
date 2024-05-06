import { ComponentProps, ComponentType } from "react";
import { Button as UIButton } from "../ui/button";
import { ArrowUpRight, LoaderIcon, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Button({
  children,
  icon,
  iconSide = "left",
  isLoading = false,
  ...props
}: {
  isLoading?: boolean;
  icon?: LucideIcon | ComponentType;
  iconSide?: "left" | "right";
} & ComponentProps<typeof UIButton>) {
  const Icon = isLoading ? LoaderIcon : icon;
  return (
    <UIButton type="button" {...props}>
      {Icon && iconSide === "left" && (
        <Icon
          className={cn("size-4", {
            ["mr-2"]: children,
            ["animate-spin"]: isLoading,
          })}
        />
      )}
      {children}
      {Icon && iconSide === "right" && (
        <Icon
          className={cn("size-4", {
            ["ml-2"]: children,
            ["animate-spin"]: isLoading,
          })}
        />
      )}
    </UIButton>
  );
}
