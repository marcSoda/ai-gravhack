import { useEffect, useState, type FC } from "react";
import styled from "styled-components";
import "./style/chat-style.css";

export type MessageSender = "user" | "bot";

export interface ChatMessage {
  timestamp: string;
  message: string;
  sender: MessageSender;
}

export interface ChatProps {
  botName?: string;
  chatHistory: ChatMessage[];
  userMessages: string[];
  botMessages: string[];
  awaitingResponse?: boolean;
}

export const Chat: FC<ChatProps> = ({
  botName = "Shadowbase AI Assistant",
  chatHistory = [],
  userMessages = [],
  botMessages = [],
  awaitingResponse = true,
}) => {
  return (
    <div className="chat">
      {chatHistory.map((chatMessage) => {
        if (chatMessage.sender === "user") {
          return <div className="from-user no-tail">{chatMessage.message}</div>;
        } else {
          return (
            <>
              <p className="sender-name margin-b_none">{botName}</p>
              <div className="from-bot no-tail">{chatMessage.message}</div>;
              {awaitingResponse ? (
                <>
                  <p className="sender-name margin-b_none">{botName}</p>
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </>
              ) : null}
            </>
          );
        }
      })}
    </div>
  );
};

export default Chat;
