import { useState } from "react";
import axios from "axios";

function ChatBox() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      source: "Gemini",
      text: "Hi! I'm your BI assistant. Ask me about work orders, deals, or projects.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!question.trim()) return;

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/ask", {
        question: userQuestion,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          source: res.data.source,
          text: res.data.answer,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          source: "Error",
          text: "Unable to connect to backend.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        margin: "0 30px 30px",
        background: "white",
        borderRadius: 20,
        boxShadow: "0 5px 20px rgba(0,0,0,.05)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: 25,
          borderBottom: "1px solid #eee",
        }}
      >
        <h2 style={{ margin: 0 }}>Ask the BI Assistant</h2>

        <span style={{ color: "#64748b" }}>
          Powered by Python & Gemini
        </span>
      </div>

      <div
        style={{
          height: 350,
          overflowY: "auto",
          padding: 25,
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              marginBottom: 20,
              display: "flex",
              justifyContent:
                m.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                background:
                  m.role === "user" ? "#2563eb" : "#f1f5f9",
                color:
                  m.role === "user" ? "white" : "#111827",
                padding: 15,
                borderRadius: 15,
                maxWidth: "70%",
              }}
            >
              {m.role !== "user" && (
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color:
                      m.source === "Python"
                        ? "#16a34a"
                        : "#7c3aed",
                    marginBottom: 6,
                  }}
                >
                  {m.source}
                </div>
              )}

              {m.text}
            </div>
          </div>
        ))}

        {loading && <p>🤖 Thinking...</p>}
      </div>

      <div
        style={{
          display: "flex",
          gap: 15,
          padding: 20,
          borderTop: "1px solid #eee",
        }}
      >
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && sendMessage()
          }
          placeholder="Ask anything..."
          style={{
            flex: 1,
            padding: 15,
            borderRadius: 10,
            border: "1px solid #ddd",
            fontSize: 16,
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: 10,
            padding: "15px 30px",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;