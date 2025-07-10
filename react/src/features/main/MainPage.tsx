import { useState } from "react";
import axios, { AxiosError } from "axios";
import { markdownToHtml } from "@/MarkdownRenderer";
import Chat, { type ChatMessage, type MessageSender } from "@/Chat";
import ChatInput from "@/ChatInput";
import { toast } from "sonner";

export default function MainPage() {
  const newMsg = (message: string, sender: MessageSender): ChatMessage => ({
    timestamp: new Date().toLocaleString(),
    message,
    sender,
  });

  const botName               = "Shadowbase AI Assistant";
  const welcome               = `Hello! I am your ${botName}. How can I help you today?`;
  const [conversationId, setConversationId] = useState<string>("");
  const [awaiting,        setAwaiting]      = useState(false);
  const [chatHistory,     setChatHistory]   = useState<ChatMessage[]>([
    newMsg(welcome, "bot"),
  ]);
  const [followup,        setFollowup]      = useState("");

  const append = (msg: string, sender: MessageSender) => {
    if (!msg.trim()) return false;
    setChatHistory((h) => [...h, newMsg(msg, sender)]);
    return true;
  };

  const ensureConversationId = async () => {
    if (conversationId) return conversationId;
    try {
      const { data } = await axios.get("/api/start-convo/");
      setConversationId(data["convo_id"]);
      return data["convo_id"] as string;
    } catch (err) {
      toast.error("Unable to start conversation");
      return "";
    }
  };

  const ask = async (question: string) => {
    if (!append(question, "user")) return;

    try {
      setAwaiting(true);
      const id = await ensureConversationId();
      if (!id) return;

      const { data } = await axios.post(`/api/send-msg/${id}`, {
        contents: question,
      });

      append(markdownToHtml(data["answer"]), "bot");
    } catch (err) {
      const msg =
        err instanceof AxiosError
          ? err.response?.data?.error ?? err.message
          : "Unknown error";
      append(msg, "bot");
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
