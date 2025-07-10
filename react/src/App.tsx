import axios from "axios";
import { useEffect, useState } from "react";
import showdown from "showdown";
import styled, { createGlobalStyle } from "styled-components";
import Chat, { type ChatMessage, type MessageSender } from "./Chat";
import ChatInput from "./ChatInput";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;  
    padding: 0;
  }

  body {
    font-family: sans-serif;
    line-height: 1.6;
    background-color: #242424;
  }
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #333;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  ul {
    list-style: none;
    display: flex;
    gap: 20px;
  }
`;

const Content = styled.main`
  padding: 80px 20px 0px; /* offset for header */
  max-width: 800px;
  margin: 0 auto;
`;

const Footer = styled.footer`
  padding: 0px 20px;
  color: #666;
  margin-top: 20px;
`;

const StyledLink = styled.a`
  color: #fff;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.6;
    color: #fff;
  }
`;

const App = () => {
  const createNewMessage = (message: string, sender: MessageSender) => {
    return {
      timestamp: new Date().toLocaleString(),
      message,
      sender,
    } as ChatMessage;
  };

  const botName = "Shadowbase AI Assistant";
  const botWelcomeMessage = `Hello! I am your ${botName}. How can I help you today?`;
  const botWelcome = createNewMessage(botWelcomeMessage, "bot");

  const [conversationId, setConversationId] = useState("");
  const [isAsking, setIsAsking] = useState(false);
  const [botMessages, setBotMessages] = useState([] as string[]);
  const [userMessages, setUserMessages] = useState([] as string[]);
  const [chatHistory, setChatHistory] = useState([] as ChatMessage[]);
  const [followUpQuestion, setFollowUpQuestion] = useState("");

  useEffect(() => {
    if (!chatHistory.length) {
      initializeChat();
    }
  }, []);

  const initializeChat = () => {
    setUserMessages([]);
    setBotMessages([botWelcomeMessage]);
    setChatHistory([botWelcome]);
  };

  const markdownToHtml = (markdown: string) => {
    const converter = new showdown.Converter();
    return converter.makeHtml(markdown);
  };

  const appendMessage = (message: string, sender: MessageSender) => {
    if (!message.trim()) return false;

    setChatHistory((history) => [
      ...history,
      createNewMessage(message, sender),
    ]);

    if (sender === "bot") {
      setBotMessages((history) => [...history, message, sender]);
    } else {
      setUserMessages((history) => [...history, message, sender]);
    }
    return true;
  };

  const handleApiError = (error: string) => {
    console.error(error);
    switch (Math.floor(Math.random() * 3)) {
      case 0:
        appendMessage(
          "I am not feeling well; let me get back to you later.",
          "bot"
        );
        return;
      case 1:
        appendMessage("It's been a tough day, can you try again later?", "bot");
        return;
      case 2:
        appendMessage("Hmmm, my brain is functioning at the moment.", "bot");
        return;
      default:
        appendMessage(
          "I am having some issues over here. Cleanup, aisle 5!",
          "bot"
        );
        return;
    }
  };

  const requestConversationId = () =>
    !conversationId
      ? axios
          .get("/api/start-convo/")
          .then((response) => {
            const id = response.data["convo_id"];
            setConversationId(id);
            return id;
          })
          .catch((err) => {
            handleApiError(err.message);
            return "";
          })
      : Promise.resolve(conversationId);

  const handleAskQuestion = async (question: string) => {
    try {
      if (
        question.toLowerCase() === "clear" ||
        question.toLowerCase() === "clr"
      ) {
        initializeChat();
        return;
      }

      if (!appendMessage(question, "user")) {
        return;
      }

      setIsAsking(true);

      const id = await requestConversationId();

      if (!id) {
        handleApiError("Could not establish conversation.");
        return;
      }

      console.log(`${question} (${id})`);

      await axios
        .post(`/api/send-msg/${id}`, {
          contents: question,
        })
        .then((response) =>
          appendMessage(markdownToHtml(response.data["answer"]), "bot")
        )
        .catch((err) => handleApiError(err.message));
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Header>
        <Logo>{botName}</Logo>
        <Nav>
          <ul>
            <li>
              <StyledLink href="#home">Home</StyledLink>
            </li>
            <li>
              <StyledLink href="#about">Team</StyledLink>
            </li>
          </ul>
        </Nav>
      </Header>
      <Content>
        <Chat
          botName={botName}
          chatHistory={chatHistory}
          awaitingResponse={isAsking}
          onFollowupClick={setFollowUpQuestion}
        />
        <ChatInput
          onAskQuestion={handleAskQuestion}
          newValue={followUpQuestion}
        />
      </Content>
      <Footer>
        &copy; {new Date().getFullYear()} Gravic, Inc. All rights reserved.
      </Footer>
    </>
  );
};

export default App;
