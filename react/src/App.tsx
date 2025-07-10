// import axios from "axios";
// import { useState } from "react";
// import styled, { createGlobalStyle } from "styled-components";
// import Chat, { type ChatMessage, type MessageSender } from "./Chat";
// import ChatInput from "./ChatInput";
// import { markdownToHtml } from "./MarkdownRenderer";

// const GlobalStyle = createGlobalStyle`
//   *, *::before, *::after {
//     box-sizing: border-box;
//     margin: 0;
//     padding: 0;
//   }

//   body {
//     font-family: sans-serif;
//     line-height: 1.6;
//     background-color: #242424;
//   }
// `;

// const Header = styled.header`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   height: 60px;
//   background: #333;
//   color: #fff;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 0 20px;
//   z-index: 1000;
// `;

// const Logo = styled.div`
//   font-size: 1.25rem;
//   font-weight: bold;
// `;

// const Nav = styled.nav`
//   ul {
//     list-style: none;
//     display: flex;
//     gap: 20px;
//   }
// `;

// const Content = styled.main`
//   padding: 80px 20px 0px; /* offset for header */
//   max-width: 800px;
//   margin: 0 auto;
// `;

// const Footer = styled.footer`
//   padding: 0px 20px;
//   color: #666;
//   margin-top: 20px;
// `;

// const StyledLink = styled.a`
//   color: #fff;
//   text-decoration: none;
//   transition: opacity 0.2s;

//   &:hover {
//     opacity: 0.6;
//     color: #fff;
//   }
// `;

// // function Home() {
// //   return <h2>Shadowbase AI Assistant</h2>;
// // }

// // function About() {
// //   return (
// //     <div>
// //       <h2>About Shadowbase AI Assistant</h2>
// //       <p>Powered by Alicia, Chris, Marc, Paden, and Rich!</p>
// //     </div>
// //   );
// // }

// const App = () => {
//   const createNewMessage = (message: string, sender: MessageSender) => {
//     return {
//       timestamp: new Date().toLocaleString(),
//       message,
//       sender,
//     } as ChatMessage;
//   };

//   const botName = "Shadowbase AI Assistant";
//   const botWelcomeMessage = `Hello! I am your ${botName}. How can I help you today?`;
//   const botWelcome = createNewMessage(botWelcomeMessage, "bot");

//   const [conversationId, setConversationId] = useState("");
//   const [isAsking, setIsAsking] = useState(false);
//   const [botMessages, setBotMessages] = useState([
//     botWelcomeMessage,
//   ] as string[]);
//   const [userMessages, setUserMessages] = useState([] as string[]);
//   const [chatHistory, setChatHistory] = useState([botWelcome] as ChatMessage[]);

//   const [followUpQuestion, setFollowUpQuestion] = useState("");

//   const appendMessage = (message: string, sender: MessageSender) => {
//     if (!message.trim()) return false;

//     setChatHistory((history) => [
//       ...history,
//       createNewMessage(message, sender),
//     ]);

//     if (sender === "bot") {
//       setBotMessages((history) => [...history, message, sender]);
//     } else {
//       setUserMessages((history) => [...history, message, sender]);
//     }
//     return true;
//   };

//   const requestConversationId = () =>
//     !conversationId
//       ? axios
//           .get("/api/start-convo/")
//           .then((response) => {
//             setConversationId(response.data["convo_id"]);
//             return response.data.message as string;
//           })
//           .catch((err) => {
//             appendMessage(err.message, "bot");
//             return "";
//           })
//       : Promise.resolve(conversationId);

//   const handleAskQuestion = async (question: string) => {
//     try {
//       console.log(question);
//       setIsAsking(true);

//       const id = await requestConversationId();

//       if (!id) return;

//       if (!appendMessage(question, "user")) {
//         return;
//       }

//       axios
//         .post(`/api/send-msg/${id}`, {
//           contents: question,
//         })
//         .then((response) =>
//           appendMessage(markdownToHtml(response.data["answer"]), "bot")
//         )
//         .catch((err) => appendMessage(err.message, "bot"));
//     } finally {
//       setIsAsking(false);
//     }
//   };

//   return (
//     <>
//       <GlobalStyle />
//       <Header>
//         <Logo>{botName}</Logo>
//         <Nav>
//           <ul>
//             <li>
//               <StyledLink href="#home">Home</StyledLink>
//             </li>
//             <li>
//               <StyledLink href="#about">Team</StyledLink>
//             </li>
//           </ul>
//         </Nav>
//       </Header>
//       <Content>
//         <Chat
//           botName={botName}
//           chatHistory={chatHistory}
//           userMessages={userMessages}
//           botMessages={botMessages}
//           awaitingResponse={isAsking}
//           onFollowupClick={setFollowUpQuestion}
//         />
//         <ChatInput
//           onAskQuestion={handleAskQuestion}
//           newValue={followUpQuestion}
//         />
//       </Content>
//       <Footer>
//         &copy; {new Date().getFullYear()} Gravic, Inc. All rights reserved.
//       </Footer>
//     </>
//   );
// };

// export default App;

import { Route, Routes } from 'react-router-dom';

import LoginForm from './features/auth/Login';
import Logout from './features/auth/Logout';
import MainPage from './features/main/MainPage';

import ProtectedRoute from './components/common/ProtectedRoute';
import Sidenav from './components/common/Sidenav';
import TopNav from './components/common/topnav';

import { Toaster } from "@/components/ui/sonner"

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

import useHideSidenavOnRoutes from './hooks/useHideSidenavOnRoutes';

function App() {
    const showSidenav = useHideSidenavOnRoutes(['/login']);

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AuthProvider>
                <Toaster richColors />
                <div className={`flex ${showSidenav ? 'pt-16' : 'pt-0'}`}>
                    {showSidenav && <TopNav />}
                    <div className="flex-1">
                        <div className="p-0">
                            <Routes>
                                <Route path="/login" element={<LoginForm />} />
                                <Route path="/logout" element={<Logout />} />
                                <Route path="/" element={<ProtectedRoute><MainPage /></ProtectedRoute>} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
