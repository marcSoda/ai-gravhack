import React, { useEffect, useState, type FC } from "react";
import InputGroup from "./InputGroup";

export interface ChatInputProps {
  newValue?: string;
  onAskQuestion: (question: string) => void;
}

export const ChatInput: FC<ChatInputProps> = ({ onAskQuestion, newValue }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (newValue) setValue(newValue);
  }, [newValue]);

  return (
    <InputGroup
      inputProps={{
        placeholder: "Ask Question",
        value,
        onChange: (e) => setValue(e.target.value),
      }}
      buttonProps={{
        onClick: () => {
          onAskQuestion(value);
          setValue("");
        },
        children: "Ask",
        disabled: value.trim() === "",
      }}
    />
  );
};

export default ChatInput;
