import { useEffect, useState } from "react";
import axios from "@/utils/axiosConfig";
import { AxiosError } from "axios";
import Chat, { type ChatMessage, type MessageSender } from "@/Chat";
import ChatInput from "@/ChatInput";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import showdown from "showdown";

const newMsg = (text: string, sender: MessageSender): ChatMessage => ({
  id: uuid(),                                 // react key
  timestamp: new Date().toLocaleString(),
  message: text,
  sender,
});

const botName = "Shadowbase AI Assistant";
const botWelcome = `Hello! I am your ${botName}. How can I help you today?`;

export default function MainPage() {
  const [conversationId, setConversationId]   = useState("");
  const [awaiting, setAwaiting]               = useState(false);
  const [chatHistory, setChatHistory]         = useState<ChatMessage[]>([]);
  const [followupOptions, setFollowupOptions] = useState([]);
  const [followup, setFollowup]               = useState("");

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
    append(humanMsg || replies[Math.floor(Math.random() * replies.length)], "bot");
  };

  const getConversationId = async () => {
    if (conversationId) return conversationId;
    try {
      const { data } = await axios.get("/api/start-convo/");
      setConversationId(data.convo_id);
      return data.convo_id as string;
    } catch (err) {
      botError("Could not start a conversation.");
      return "";
    }
  };

  const markdownToHtml = (markdown: string) => {
    const converter = new showdown.Converter();
    return converter.makeHtml(markdown);
  };

  const ask = async (question: string) => {
    const q = question.trim();
    if (!q) return;

    if (q.toLowerCase() === "clear" || q.toLowerCase() === "clr") {
      setChatHistory([newMsg(botWelcome, "bot")]);
      setConversationId("");
      return;
    }

    append(q, "user");
    setAwaiting(true);

    try {
      const id = await getConversationId();
      if (!id) return;

      const { data } = await axios.post(`/api/send-msg/${id}`, { contents: q, follow_up_count: 3 });
      append(markdownToHtml(data.answer), "bot");
      setFollowupOptions(data.recommended_follow_ups || [])
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
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1 flex flex-col items-center px-4 pt-4 lg:pt-8">
        <div className="w-full max-w-3xl space-y-6">
          <Chat
            botName={botName}
            chatHistory={chatHistory}
            awaitingResponse={awaiting}
            followupOptions={followupOptions}
            onFollowupClick={setFollowup}
          />

          <ChatInput onAskQuestion={ask} newValue={followup} />
        </div>
      </main>

      <footer className="text-center text-sm py-4 text-muted-foreground">
        © {new Date().getFullYear()} Gravic, Inc. All rights reserved.
      </footer>
    </div>
  );
}
