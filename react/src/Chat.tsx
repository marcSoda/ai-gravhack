import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState, type FC } from "react";
import FollowUpQuestions from "./FollowUpQuestions";
import "./style/chat-style.css";

export type MessageSender = "user" | "bot";

export interface ChatMessage {
  id: string;
  timestamp: string;
  message: string;
  sender: MessageSender;
}

export interface ChatProps {
  botName?: string;
  chatHistory: ChatMessage[];
  awaitingResponse?: boolean;
  followupOptions?: string[];
  onFollowupClick?: (questionText: string) => void;
}

export const Chat: FC<ChatProps> = observer(
  ({
    botName = "Shadowbase AI Assistant",
    chatHistory = [],
    awaitingResponse = false,
    followupOptions = [],
    onFollowupClick,
  }) => {
    const [showFollowUps, setShowFollowUps] = useState(false);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
      setShowFollowUps(false);
      scrollToBottom();
    }, [chatHistory.length]);

    useEffect(() => {
      scrollToBottom();
    }, [showFollowUps]);

    const lastBotMessage = chatHistory
      .slice()
      .reverse()
      .find((msg) => msg.sender === "bot")?.id;

    return (
      <div className="chat flex-1 min-h-0 overflow-y-auto pr-2">
        {chatHistory.map((chatMessage, index) => {
          const onClick =
            index === chatHistory.length - 1
              ? () => setShowFollowUps((show) => !show)
              : undefined;
          if (chatMessage.sender === "user") {
            return (
              <div
                key={chatMessage.id}
                className="from-user"
                onClick={onClick}
                dangerouslySetInnerHTML={{ __html: chatMessage.message }}
              />
            );
          }
          const isLastBotMessage =
            !!lastBotMessage && lastBotMessage === chatMessage.id;

          return (
            <div key={chatMessage.id}>
              <p className="sender-name">{botName}</p>
              <div
                className="from-bot"
                style={{
                  cursor:
                    followupOptions.length > 0 && isLastBotMessage
                      ? "pointer"
                      : "default",
                }}
                title={
                  followupOptions.length > 0 && isLastBotMessage
                    ? showFollowUps
                      ? "Hide suggested follow-up questions."
                      : "Show suggested follow-up questions."
                    : ""
                }
                onClick={onClick}
                dangerouslySetInnerHTML={{ __html: chatMessage.message }}
              />
            </div>
          );
        })}
        {showFollowUps && followupOptions.length > 0 && (
          <FollowUpQuestions
            onClick={onFollowupClick}
            questions={followupOptions}
          />
        )}
        {awaitingResponse && (
          <>
            <p className="sender-name">{botName}</p>
            <div className="typing-indicator">
              <span />
              <span />
              <span />
            </div>
          </>
        )}
        <div ref={bottomRef} />
      </div>
    );
  }
);

export default Chat;
