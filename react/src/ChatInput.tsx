import React, { useState ,type FC} from "react";
import InputGroup from "./InputGroup";

export interface ChatInputProps {
  onAskQuestion: (question: string) => void;
}

export const ChatInput: FC<ChatInputProps> = ({ onAskQuestion }) => {
  const [value, setValue] = useState("");

  return (
    <InputGroup
      inputProps={{
        placeholder: "Ask Question",
        value,
        onChange: (e) => setValue(e.target.value),
      }}
      buttonProps={{
        onClick: () => onAskQuestion(value),
        children: "Ask",
        disabled: value.trim() === "",
      }}
    />
  );
};

export default ChatInput;
