// resources/js/Components/ChatWidget.jsx
import { useState } from "react";
import { ChatBubbleLeftRightIcon, PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function ChatWidget({ csrf }) {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Bonjour 👋 Je suis votre assistant LivraisonPro. Comment puis-je aider ?" }
  ]);

  async function sendMessage(text) {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setMsg("");
    setLoading(true);
    try {
      const res = await fetch("/chatbot/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrf
        },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      setMessages((m) => [...m, { from: "bot", text: data.reply, links: data.links }]);
      if (data.suggestions?.length) {
        setMessages((m) => [...m, { from: "bot-suggestions", suggestions: data.suggestions }]);
      }
    } catch (e) {
      setMessages((m) => [...m, { from: "bot", text: "Désolé, une erreur est survenue. Réessayez plus tard." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full p-4 shadow-lg bg-gradient-to-r from-blue-600 to-orange-400 text-white hover:scale-105 transition"
        aria-label="Ouvrir le chat"
      >
        <ChatBubbleLeftRightIcon className="w-6 h-6" />
      </button>

      {/* Fenêtre de chat */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[340px] max-w-[90vw] rounded-2xl shadow-2xl border border-gray-200 bg-white flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
            <div className="font-semibold">Assistant LivraisonPro</div>
            <button onClick={() => setOpen(false)} aria-label="Fermer">
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="p-3 space-y-2 h-80 overflow-auto">
            {messages.map((m, i) =>
              m.from === "bot-suggestions" ? (
                <div key={i} className="flex flex-wrap gap-2">
                  {m.suggestions.map((s, k) => (
                    <button
                      key={k}
                      onClick={() => sendMessage(s)}
                      className="text-xs px-3 py-1 rounded-full border border-gray-200 bg-gray-50 hover:bg-blue-50 hover:border-blue-300"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              ) : (
                <div
                  key={i}
                  className={`${m.from === "user" ? "justify-end" : "justify-start"} flex`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow ${
                      m.from === "user"
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-800 rounded-bl-sm"
                    }`}
                  >
                    <div>{m.text}</div>
                    {m.links?.length ? (
                      <div className="mt-2 space-x-2">
                        {m.links.map((l, idx) => (
                          <a key={idx} href={l.href} className="text-xs underline text-blue-700">
                            {l.label}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              )
            )}
            {loading && (
              <div className="text-xs text-gray-400 italic">L’assistant écrit…</div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(msg);
            }}
            className="p-3 border-t border-gray-200 flex items-center gap-2"
          >
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Écrivez votre message…"
              className="flex-1 text-sm border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={loading || !msg.trim()}
              className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold shadow-sm bg-gradient-to-r from-blue-600 to-orange-400 text-white hover:from-blue-700 hover:to-orange-500 disabled:opacity-50"
            >
              <PaperAirplaneIcon className="w-4 h-4" />
              Envoyer
            </button>
          </form>
        </div>
      )}
    </>
  );
}
