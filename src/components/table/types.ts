import { ReactNode } from "react";

export interface ActionButton<T> {
  label?: string;
  icon: ReactNode;
  isAdd?: boolean;
  onClick: (row: T) => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "sm" | "md" | "lg" | "icon";
  className?: string;
  disabled?: (row: T) => boolean;
}
