import React, { useEffect, useState, type FC } from "react";
import InputGroup from "./InputGroup";
import { SendHorizonal } from "lucide-react";

export interface ChatInputProps {
  newValue?: string;
  onAskQuestion: (question: string) => void;
}

export const ChatInput: FC<ChatInputProps> = ({ onAskQuestion, newValue }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (newValue !== undefined) setValue(newValue);
  }, [newValue]);

  const send = () => {
    const text = value.trim();
    if (!text) return;
    onAskQuestion(text);
    setValue("");
  };

  return (
    <form
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        send();
      }}
    >
      <InputGroup
        inputProps={{
          placeholder: "Ask a question…",
          value,
          onChange: (e) => setValue(e.target.value),
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              send();
            }
          },
          className: "min-h-[2.5rem]",
        }}
        buttonProps={{
          type: "submit",
          disabled: value.trim() === "",
          children: <SendHorizonal className="h-4 w-4" />,
          "aria-label": "Send message",
          onClick: send,
        }}
      />
    </form>
  );
};

export default ChatInput;
