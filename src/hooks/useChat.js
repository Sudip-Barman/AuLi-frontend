import { useState, useEffect } from "react";
import { apiFetch } from "../utils/apiFetch";
import API_URL from "../api";

function useChat(
    setRefreshChats, 
    activeConversationId,
    activeMode,
) {
  const token = localStorage.getItem("token");

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hello 👋 I am AuLi AI. What do you want to learn today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pdfText, setPdfText] = useState("");
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  

  // =========================
  // LOAD CONVERSATION
  // =========================
  useEffect(() => {
    if (!activeConversationId) return;
    if (!token) return;

    const fetchConversation = async () => {
      try {
        const res = await apiFetch(
          `${API_URL}/conversation/${activeConversationId}`
        );

        if (!res) return;

        const data = await res.json();

        setMessages(data);
        setConversationId(activeConversationId);
      } catch (err) {
        console.error("Failed to load conversation", err);
      }
    };

    fetchConversation();
  }, [activeConversationId]);

  // =========================
  // SEND MESSAGE
  // =========================
  const sendMessage = async () => {
    if (!token) return;
    if ((!input.trim() && !selectedPdf) || loading) return;

    setLoading(true);

    let extractedPdfText = pdfText;

    try {
      // =========================
      // PDF UPLOAD
      // =========================
      if (selectedPdf && !pdfText) {
        const formData = new FormData();
        formData.append("file", selectedPdf);

        const pdfRes = await apiFetch(
          `${API_URL}/upload-pdf`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!pdfRes) return;

        const pdfData = await pdfRes.json();
        extractedPdfText = pdfData.text || "";
        setPdfText(extractedPdfText);
      }

      // =========================
      // USER MESSAGE
      // =========================
      const userMsg = {
        role: "user",
        text: input,
        pdf: selectedPdf ? { name: selectedPdf.name } : null,
      };

      setMessages((prev) => [...prev, userMsg]);

      const currentInput = input;
      setInput("");

      const newHistory = [
        ...history,
        { role: "user", content: currentInput },
      ];

      // =========================
      // CREATE CONVERSATION
      // =========================
      let currentConversationId =
        activeConversationId || conversationId;

      if (!currentConversationId) {
        const convoRes = await apiFetch(
          `${API_URL}/conversation/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: currentInput,
            }),
          }
        );

        if (!convoRes) return;

        const convoData = await convoRes.json();

        currentConversationId = convoData.conversation_id;
        setConversationId(currentConversationId);

        setRefreshChats((prev) => !prev);
      }

      // =========================
      // CHAT REQUEST
      // =========================
      const res = await apiFetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
          history: newHistory,
          pdfText: extractedPdfText,
          conversation_id: currentConversationId,
           mode: activeMode,
        }),
      });

      const data = await res.json();
      setRefreshChats(prev => !prev)
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: data.reply,
        },
      ]);

      setHistory([
        ...newHistory,
        { role: "assistant", content: data.reply },
      ]);

      setSelectedPdf(null);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "⚠️ Failed to process request",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    setMessages,
    input,
    setInput,
    loading,
    sendMessage,
    selectedPdf,
    setSelectedPdf,
  };
}

export default useChat;