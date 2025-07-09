import { observer } from "mobx-react-lite";
import { useEffect, useState, type FC } from "react";
import HtmlRenderer from "./HtmlRenderer";
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

export const Chat: FC<ChatProps> = observer(
  ({
    botName = "Shadowbase AI Assistant",
    chatHistory = [],
    userMessages = [],
    botMessages = [],
    awaitingResponse = false,
  }) => {
    const renderChat = () => {
      const messageCount = chatHistory.length;

      if (!messageCount) return "<></>";

      const content = [] as string[];

      content.push(createTag("div", "chat", ""));

      for (
        let messageIndex = 0;
        messageIndex <= messageCount - 1;
        messageIndex++
      ) {
        if (chatHistory[messageIndex].sender === "user") {
          content.push(styleUserMessage(chatHistory[messageIndex].message));
        } else {
          content.push(createTag("p", "sender-name margin-b_none", botName));
          content.push(styleBotMessage(chatHistory[messageIndex].message));
        }
      }

      if (awaitingResponse) {
        content.push(createTag("p", "sender-name margin-b_none", botName));
        content.push(
          styleBotMessage(
            "<div class='typing-indicator'><span></span><span></span><span></span></div>"
          )
        );
      }

      content.push("</div>");

      return content.join("");
    };

    const createTag = (tagName: string, className: string, contents: string) =>
      !contents
        ? `<${tagName} class='${className}'>`
        : `<${tagName} class='${className}'>${contents}</${tagName}>`;

    const styleUserMessage = (message: string) =>
      createTag("div", appendStyleClassNames("from-user"), message);

    const styleBotMessage = (message: string) =>
      createTag("div", appendStyleClassNames("from-bot"), message);

    const appendStyleClassNames = (baseClassName: string) =>
      `${baseClassName} no-tail`;

    const [chatContent, setChatContent] = useState(renderChat());

    useEffect(() => {
        console.log('awaitingResponse',awaitingResponse)
      setChatContent(renderChat());
    }, [awaitingResponse]);

    return <HtmlRenderer html={chatContent} />;
  }
);

export default Chat;
