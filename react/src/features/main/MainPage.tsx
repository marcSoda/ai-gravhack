import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import showdown from "showdown";
import { v4 as uuid } from "uuid";
import axios from "../..//utils/axiosConfig";
import AboutPage from "../../AboutPage";
import HelpPage from "../../HelpPage";
import Chat, { type ChatMessage, type MessageSender } from "../../Chat";
import ChatInput from "../../ChatInput";
import { Card, CardContent, CardFooter } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import TeamPage from "../../TeamPage";

const newMsg = (text: string, sender: MessageSender): ChatMessage => ({
  id: uuid(), // react keys
  timestamp: new Date().toLocaleString(),
  message: text,
  sender,
});

const botName = "Shadowbase AI Assistant";
const botWelcome = `Hello! I am your ${botName}. How can I help you today?`;

export default function MainPage() {
  const [conversationId, setConversationId] = useState("");
  const [awaiting, setAwaiting] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [followupOptions, setFollowupOptions] = useState<string[]>([]);
  const [followup, setFollowup] = useState("");

  useEffect(() => {
    setChatHistory([newMsg(botWelcome, "bot")]);
  }, []);

  const append = (text: string, sender: MessageSender) => {
    if (!text.trim()) return;
    setChatHistory((h) => [...h, newMsg(text, sender)]);
  };

  const botError = (humanMsg: string) => {
    const replies = [
      "I’m feeling a bit off – could you try again later?",
      "Hmmm … my brain is lagging. One more time?",
      "Cleanup on aisle 5! Something went wrong.",
    ];
    append(
      humanMsg || replies[Math.floor(Math.random() * replies.length)],
      "bot"
    );
  };

  const getConversationId = async () => {
    if (conversationId) return conversationId;
    try {
      const { data } = await axios.get("/api/start-convo/");
      setConversationId(data.convo_id);
      return data.convo_id as string;
    } catch {
      botError("Could not start a conversation.");
      return "";
    }
  };

  const markdownToHtml = (markdown: string) =>
    new showdown.Converter().makeHtml(markdown);

  const ask = async (question: string) => {
    const q = question.trim();
    if (!q) return;
    if (["clear", "clr"].includes(q.toLowerCase())) {
      setChatHistory([newMsg(botWelcome, "bot")]);
      setConversationId("");
      setFollowupOptions([]);
      return;
    }
    append(q, "user");
    setAwaiting(true);
    try {
      const id = await getConversationId();
      if (!id) return;
      const { data } = await axios.post(`/api/send-msg/${id}`, {
        contents: q,
        follow_up_count: 3,
      });
      append(markdownToHtml(data.answer), "bot");
      setFollowupOptions(data.recommended_follow_ups || []);
    } catch (err) {
      const msg =
        err instanceof AxiosError
          ? err.response?.data?.error ?? err.message
          : "Unexpected error.";
      botError(msg);
    } finally {
      setAwaiting(false);
    }
  };

  return (
    <Routes>
      <Route path="/about" element={<AboutPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route
        path="/"
        element={
          <div className="flex flex-col h-[calc(100vh-4rem)] bg-background text-foreground overflow-hidden">
            <main className="flex-1 flex flex-col items-center px-4 pt-4 lg:pt-8 overflow-hidden min-h-0">
              <Card className="w-full max-w-3xl flex flex-col flex-1 bg-card text-card-foreground shadow-lg border min-h-0">
                <CardContent className="flex-1 flex flex-col pt-6 overflow-hidden min-h-0">
                  <Chat
                    botName={botName}
                    chatHistory={chatHistory}
                    awaitingResponse={awaiting}
                    followupOptions={followupOptions}
                    onFollowupClick={setFollowup}
                  />
                </CardContent>
                <Separator />
                <CardFooter className="pt-4 pb-6">
                  <div className="w-full">
                    <ChatInput
                      isAsking={awaiting}
                      onAskQuestion={ask}
                      newValue={followup}
                    />
                  </div>
                </CardFooter>
              </Card>
            </main>
            <footer className="text-center text-xs py-4 text-muted-foreground shrink-0">
              © {new Date().getFullYear()} Gravic, Inc. All rights reserved.
            </footer>
          </div>
        }
      />
    </Routes>
  );
}
