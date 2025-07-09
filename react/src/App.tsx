import axios from "axios";
import { useState } from "react";
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

// function Home() {
//   return <h2>Shadowbase AI Assistant</h2>;
// }

// function About() {
//   return (
//     <div>
//       <h2>About Shadowbase AI Assistant</h2>
//       <p>Powered by Alicia, Chris, Marc, Paden, and Rich!</p>
//     </div>
//   );
// }

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

  const [isAsking, setIsAsking] = useState(false);
  const [botMessages, setBotMessages] = useState([
    botWelcomeMessage,
  ] as string[]);
  const [userMessages, setUserMessages] = useState([] as string[]);
  const [chatHistory, setChatHistory] = useState([botWelcome] as ChatMessage[]);

  const handleAskQuestion = (question: string) => {
    try {

      console.log(question)
      setIsAsking(true);
      if (!appendMessage(question, "user")) {
        return;
      }

      //ask the question here
      axios
        .get("/api/hello/")
        .then((response) => appendMessage(response.data.message, "bot"))
        .catch((err) => appendMessage(err.message, "bot"));
    } finally {
      setIsAsking(false);
    }
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
          userMessages={userMessages}
          botMessages={botMessages}
          awaitingResponse={isAsking}
        />
        <ChatInput onAskQuestion={handleAskQuestion} />
      </Content>
      <Footer>
        &copy; {new Date().getFullYear()} Gravic, Inc. All rights reserved.
      </Footer>
    </>
  );
};

export default App;
