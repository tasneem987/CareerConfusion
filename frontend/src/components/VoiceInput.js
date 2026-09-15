import React, { useState, useEffect, useRef } from "react";

const isSupported =
  typeof window !== "undefined" &&
  ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

export default function VoiceInput({ setText }) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!isSupported) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true; // 👈 Shows words as you speak, not just at the end
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let fullTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        fullTranscript += event.results[i][0].transcript;
      }
      setText(fullTranscript); // ✅ Writes live to the search bar
    };

    recognition.onerror = (event) => {
      console.error("Voice error:", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isSupported) return null;

  const toggleListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (listening) {
      recognition.stop();
      setListening(false);
    } else {
      setText(""); // Clear the search bar when you start speaking
      recognition.start();
      setListening(true);
    }
  };

  return (
    <div className="voice-container">
      <button
        className={`voice-btn ${listening ? "listening" : ""}`}
        onClick={toggleListening}
      >
        {listening ? "🎙️ Listening..." : "🎤"}
      </button>
    </div>
  );
}