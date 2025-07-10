import { observer } from "mobx-react-lite";
import { useEffect, useState, type FC } from "react";
import FollowUpQuestions from "./FollowUpQuestions";
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
  onFollowupClick?: (questionText: string) => void;
}

export const Chat: FC<ChatProps> = observer(
  ({
    botName = "Shadowbase AI Assistant",
    chatHistory = [],
    userMessages = [],
    botMessages = [],
    awaitingResponse = false,
    onFollowupClick,
  }) => {
    const [showFollowUps, setShowFollowUps] = useState(false);

    useEffect(() => {
      setShowFollowUps(false);
    }, [chatHistory.length]);

    return (
      <div className="chat">
        {chatHistory.map((chatMessage, index) => {
          const onClick =
            index === chatHistory.length - 1
              ? () => setShowFollowUps((showFollowUps) => !showFollowUps)
              : undefined;
          if (chatMessage.sender === "user") {
            return (
              <div
                className="from-user no-tail"
                onClick={onClick}
                dangerouslySetInnerHTML={{ __html: chatMessage.message }}
              />
            );
          } else {
            return (
              <>
                <p className="sender-name margin-b_none">{botName}</p>
                <div
                  className="from-bot no-tail"
                  onClick={onClick}
                  dangerouslySetInnerHTML={{ __html: chatMessage.message }}
                />
              </>
            );
          }
        })}
        {showFollowUps && (
          <FollowUpQuestions
            onClick={onFollowupClick}
            questions={[
              "What are the advantages of using Shadowbase for data replication?",
              "How does Shadowbase handle data consistency during replication?",
              "Can Shadowbase be integrated with cloud-based systems?",
            ]}
          />
        )}
        {awaitingResponse && (
          <>
            <p className="sender-name margin-b_none">{botName}</p>
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
