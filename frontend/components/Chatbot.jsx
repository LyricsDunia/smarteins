import React from "react";

function Chatbot({ isVoiceActive, setIsVoiceActive }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([
    {
      id: 1,
      text:
        "Hi! I'm GadgetGenie, your AI gadget assistant. What are you looking for today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const [isListening, setIsListening] = React.useState(false);

  const messagesEndRef = React.useRef(null);

  /* -------------------- Auto scroll -------------------- */
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* -------------------- Helpers -------------------- */
  const formatBotMessage = (text) =>
    text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br/>");

  const generateMockChatResponse = async (input) => {
    await new Promise((r) => setTimeout(r, 1000));

    if (/hi|hello|hey/i.test(input)) {
      return "Hi 👋 I’m **GadgetGenie**. Tell me what gadget you’re looking for!";
    }

    if (/laptop/i.test(input)) {
      return `
### Laptop Suggestions
• **Dell XPS**
• **MacBook Air**
• **ASUS ROG**

Want gaming, work, or budget options?
`;
    }

    return "I can help compare gadgets, prices, and features. Try asking about smartphones or laptops.";
  };

  /* -------------------- Message sender -------------------- */
  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      text,
      sender: "user",
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    const response = await generateMockChatResponse(text);

    const botMessage = {
      id: Date.now() + 1,
      text: response,
      sender: "bot",
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleSendMessage = () => {
    sendMessage(inputMessage);
    setInputMessage("");
  };

  /* -------------------- Voice input (reliable) -------------------- */
  const handleVoiceInput = () => {
    if (isListening) return;

    setIsListening(true);
    setIsVoiceActive(true);

    setTimeout(() => {
      const voiceText = "I want a gaming laptop under 80000";
      setIsListening(false);
      setIsVoiceActive(false);
      sendMessage(voiceText); // ✅ no race condition
    }, 3000);
  };

  /* -------------------- UI -------------------- */
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-[var(--primary-color)] text-white rounded-full shadow-lg flex items-center justify-center"
        >
          💬
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-lg shadow-xl w-96 h-96 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h3 className="font-semibold">GadgetGenie</h3>
            <p className="text-xs text-gray-500">AI Gadget Assistant</p>
          </div>
          <button onClick={() => setIsOpen(false)}>✕</button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs ${
                  m.sender === "user"
                    ? "bg-[var(--primary-color)] text-white"
                    : "bg-gray-100"
                }`}
              >
                {m.sender === "bot" ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: formatBotMessage(m.text)
                    }}
                  />
                ) : (
                  m.text
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="text-sm text-gray-400">
              GadgetGenie is typing…
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t flex space-x-2">
          <input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 border rounded px-3 py-2"
            placeholder="Ask about any gadget…"
          />
          <button
            onClick={handleVoiceInput}
            className={`px-3 ${
              isListening ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
          >
            🎤
          </button>
          <button onClick={handleSendMessage} className="btn-primary px-4">
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
