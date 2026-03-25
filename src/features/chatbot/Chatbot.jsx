"use client";
import { useState, useRef, useEffect } from "react";
import { getChatResponse } from "../../lib/chatBotApi";

export default function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [speechSupported, setSpeechSupported] = useState(false);
    const messagesEndRef = useRef(null);
    const recognitionRef = useRef(null);
    const [lang, setLang] = useState("English");

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return { text: "Good Morning", emoji: "🌅" };
        if (hour >= 12 && hour < 17) return { text: "Good Afternoon", emoji: "☀️" };
        if (hour >= 17 && hour < 21) return { text: "Good Evening", emoji: "🌇" };
        return { text: "Good Night", emoji: "🌙" };
    };
    const greeting = getGreeting();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (
            typeof window !== "undefined" &&
            ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
        ) {
            setSpeechSupported(true);
        }
    }, []);

    const getSpeechLangCode = (lang) => {
        const map = {
            English: "en-IN",
            Hindi: "hi-IN",
            Tamil: "ta-IN",
            Telugu: "te-IN",
        };
        return map[lang] || "en-IN";
    };

    const startListening = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        const recognition = new SpeechRecognition();
        recognition.lang = getSpeechLangCode(lang);
        recognition.interimResults = true;
        recognition.continuous = false;

        recognition.onstart = () => setIsListening(true);
        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map((r) => r[0].transcript)
                .join("");
            setInput(transcript);
        };
        recognition.onerror = (e) => {
            console.error("Speech error:", e.error);
            setIsListening(false);
        };
        recognition.onend = () => setIsListening(false);

        recognitionRef.current = recognition;
        recognition.start();
    };

    const stopListening = () => {
        recognitionRef.current?.stop();
        setIsListening(false);
    };

    const toggleListening = () => {
        if (isListening) stopListening();
        else startListening();
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg = { type: "user", text: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await getChatResponse(input);
            setMessages((prev) => [...prev, { type: "bot", text: response }]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { type: "bot", text: "Sorry, something went wrong. Please try again." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    // Quick suggestion chips relevant to Pockit Engineers
    const suggestionChips = [
        "My laptop is slow",
        "Printer not working",
        "WiFi is weak",
        "How much does it cost?",
        "Book a service",
        "What areas do you cover?",
    ];

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">

            {/* Chat Window */}
            <div
                className={`transform transition-all duration-300 ease-out ${isOpen
                    ? "scale-100 opacity-100 pointer-events-auto"
                    : "scale-95 opacity-0 pointer-events-none"
                    }`}
            >
                <div className="w-80 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100" style={{ height: "460px" }}>

                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
                                    🔧
                                </div>
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                            </div>
                            <div>
                                <h3 className="font-bold text-base leading-tight">Pockit Engineers</h3>
                                <p className="text-xs text-green-200 font-medium">● Fast Fix Guaranteed</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:bg-white/20 rounded-full p-2 transition"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 gap-2">
                                <div className="text-4xl">{greeting.emoji}</div>
                                <p className="font-bold text-gray-700 text-lg">{greeting.text}!</p>
                                <p className="text-sm text-gray-500 px-4">
                                    I&apos;m your Pockit Engineers assistant. How can I help fix your tech today?
                                </p>
                                <div className="flex flex-wrap gap-2 justify-center mt-2">
                                    {suggestionChips.map((chip) => (
                                        <button
                                            key={chip}
                                            onClick={() => setInput(chip)}
                                            className="text-xs px-3 py-1.5 bg-white border border-blue-200 text-blue-600 rounded-full hover:bg-blue-50 transition shadow-sm"
                                        >
                                            {chip}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <>
                                {messages.map((msg, i) => (
                                    <div
                                        key={i}
                                        className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"
                                            } animate-fadeIn`}
                                    >
                                        {msg.type === "bot" && (
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm flex-shrink-0 mr-2">
                                                🔧
                                            </div>
                                        )}
                                        <div
                                            className={`px-4 py-2.5 rounded-2xl max-w-[200px] text-sm leading-relaxed ${msg.type === "user"
                                                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-none"
                                                : "bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm"
                                                }`}
                                        >
                                            {msg.text}
                                        </div>
                                        {msg.type === "user" && (
                                            <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white text-sm flex-shrink-0 ml-2">
                                                👤
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm flex-shrink-0 mr-2">
                                            🔧
                                        </div>
                                        <div className="px-4 py-3 rounded-2xl bg-white border border-gray-200 rounded-bl-none shadow-sm">
                                            <div className="flex gap-1 items-center">
                                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
                                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></span>
                                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="px-2 pt-1 pb-2 border-t border-gray-200 bg-white flex-shrink-0">
                        {isListening && (
                            <div className="flex items-center gap-1 px-1 pb-1 text-purple-500 text-xs font-medium animate-pulse">
                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full inline-block"></span>
                                Listening...
                            </div>
                        )}
                        <div className="flex items-center gap-1 w-full">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                placeholder={
                                    isListening
                                        ? "Listening..."
                                        : lang === "Hindi"
                                            ? "संदेश लिखें..."
                                            : "Describe your issue..."
                                }
                                disabled={isLoading}
                                className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition text-sm disabled:bg-gray-100"
                            />

                            {/* Language Dropdown */}
                            <select
                                value={lang}
                                onChange={(e) => setLang(e.target.value)}
                                className="flex-shrink-0 w-12 px-1 py-2 border border-gray-300 rounded-full text-xs text-center focus:outline-none focus:border-blue-400 bg-white cursor-pointer"
                            >
                                <option value="English">EN</option>
                                <option value="Hindi">HI</option>
                                <option value="Tamil">TA</option>
                                <option value="Telugu">TE</option>
                            </select>

                            {/* Mic Button */}
                            {speechSupported && (
                                <button
                                    onClick={toggleListening}
                                    disabled={isLoading}
                                    title={isListening ? "Stop listening" : "Speak your message"}
                                    className={`flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 ${isListening
                                        ? "bg-purple-500 text-white animate-pulse"
                                        : "bg-gray-100 text-gray-500 hover:bg-blue-100 hover:text-blue-600"
                                        } disabled:opacity-40 disabled:cursor-not-allowed`}
                                >
                                    {isListening ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                            <rect x="6" y="6" width="12" height="12" rx="2" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v6a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2zm7 8a1 1 0 0 1 1 1 8 8 0 0 1-7 7.938V21h2a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h2v-1.062A8 8 0 0 1 4 12a1 1 0 1 1 2 0 6 6 0 1 0 12 0 1 1 0 0 1 1-1z" />
                                        </svg>
                                    )}
                                </button>
                            )}

                            {/* Send Button */}
                            <button
                                onClick={sendMessage}
                                disabled={isLoading || !input.trim()}
                                className={`flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full font-semibold transition-all text-sm ${isLoading || !input.trim()
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-gradient-to-r bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105"
                                    }`}
                            >
                                ➤
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toggle Button */}
            <div className="relative">
                {!isOpen && (
                    <>
                        <span className="absolute inset-0 rounded-full bg-blue-500 opacity-30 animate-ping"></span>
                        <span className="absolute inset-0 rounded-full bg-purple-500 opacity-20 animate-ping" style={{ animationDelay: "0.4s" }}></span>
                    </>
                )}

                {/* Notification dot — disappears permanently after first open */}
                {!hasOpened && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center z-10 shadow">
                        1
                    </span>
                )}

                <button
                    onClick={() => {
                        if (!isOpen) setHasOpened(true);
                        setIsOpen(!isOpen);
                    }}
                    className={`relative w-14 h-14 rounded-full shadow-xl flex items-center justify-center transform transition-all duration-300 ${isOpen
                        ? "bg-gray-600 hover:bg-gray-700"
                        : "bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-2xl hover:scale-110"
                        }`}
                >
                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-2 10H6V10h12v2zm0-4H6V6h12v2z" />
                        </svg>
                    )}
                </button>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
                .delay-100 { animation-delay: 0.1s; }
                .delay-200 { animation-delay: 0.2s; }
            `}</style>
        </div>
    );
}