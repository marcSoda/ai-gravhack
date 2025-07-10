import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { FC, InputHTMLAttributes, ButtonHTMLAttributes } from "react";

export interface InputGroupProps {
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  buttonProps: ButtonHTMLAttributes<HTMLButtonElement>;
}

const InputGroup: FC<InputGroupProps> = ({ inputProps, buttonProps }) => (
  <div className="flex w-full gap-2">
    <Input
      {...inputProps}
      className={cn(
        "flex-1",
        "bg-card text-card-foreground placeholder-muted-foreground",
        inputProps.className
      )}
    />
    <Button
      size="icon"
      {...buttonProps}
      className={cn(
        "shrink-0",
        buttonProps.className
      )}
    />
  </div>
);

export default InputGroup;
