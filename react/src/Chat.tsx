import { observer } from "mobx-react-lite";
import { useEffect, useState, type FC } from "react";
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

    /* collapse follow-ups whenever a new message arrives */
    useEffect(() => {
      setShowFollowUps(false);
    }, [chatHistory.length]);

    return (
      <div className="chat">
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

          return (
            <div key={chatMessage.id}>
              <p className="sender-name">{botName}</p>
              <div
                className="from-bot"
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
      </div>
    );
  }
);

export default Chat;
