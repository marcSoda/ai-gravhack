import { useEffect, useState } from "react";
import styled from "styled-components";
import HtmlRenderer from "./HtmlRenderer";
import "./style/chat-style.css";

interface ChatMessage {
  timestamp: string;
  message: string;
  sender: "user" | "bot";
}

function Chat() {
  const botName = "Shadowbase AI Assistant";
  const botWelcomeMessage = `Hello! I am your ${botName}. How can I help you today?`;

  const botWelcome = {
    timestamp: Date.now().toString(),
    message: botWelcomeMessage,
    sender: "bot",
  } as ChatMessage;

  const [botMessages, setBotMessages] = useState([
    botWelcomeMessage,
  ] as string[]);
  const [userMessages, setUserMessages] = useState([] as string[]);
  const [chatHistory, setChatHistory] = useState([botWelcome] as ChatMessage[]);

  const renderChat = (showReplyingAnimation: boolean) => {
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

    if (showReplyingAnimation) {
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

  return <HtmlRenderer html={renderChat(false)} />;
}

export default Chat;
