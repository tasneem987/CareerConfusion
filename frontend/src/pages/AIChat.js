import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../styles/chat.css";
import VoiceInput from "../components/VoiceInput";

export default function AIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { 
      text: input, 
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setShowWelcome(false);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: input,
      });

      console.log("N8N RESPONSE:", res.data);

      const answer = res.data.reply || "Sorry, I couldn't process that. Try asking about careers!";
      setMessages((prev) => [...prev, { 
        text: answer, 
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err) {
      console.error("ERROR:", err);
      setMessages((prev) => [...prev, { 
        text: "⚠️ AI Assistant is temporarily unavailable. Please check if n8n is running.", 
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <div className="chat-header">
          <div className="chatbot-icon">🤖</div>
          <div>
            <h1>AI Career Assistant</h1>
            <p className="chat-subtitle">Your professional career advisor</p>
          </div>
        </div>

        <div className="chat-container">
          <div className="chat-box">
            {showWelcome && (
              <div className="welcome-message">
                <h2 className="welcome-title">Welcome to AI Career Assistant! 👋</h2>
                <p className="welcome-subtitle">
                  Ask me anything about careers, job hunting, resume tips, interview prep, 
                  or industry trends. I'm here to help you level up your career! 🚀
                </p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div key={index} className={`msg ${msg.sender}`}>
                <div>{msg.text}</div>
                {msg.time && <div className="msg-time">{msg.time}</div>}
              </div>
            ))}

            {isLoading && (
              <div className="typing-indicator">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span>AI Career Assistant is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-wrapper">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about careers, resumes, interviews..."
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              disabled={isLoading}
            />
            {/* Voice Input Button */}
  <VoiceInput setText={setInput} />
            <button 
              onClick={sendMessage} 
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                <svg viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}