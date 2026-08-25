import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  BadgeDollarSign,
  Bot,
  Building2,
  Home,
  Loader2,
  MessageCircle,
  Package,
  Phone,
  Send,
  X,
} from 'lucide-react';
import { BUSINESS } from '../lib/constants';
import { trackEvent } from '../lib/analytics';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME_MESSAGE =
  'Namaste! 👋 Main Saket Packers & Movers ke baare mein aapki help kar sakta hoon. Aapko kis type ki shifting chahiye?';

const QUICK_ACTIONS = [
  { label: 'House Shifting', message: 'Mujhe house shifting ke baare mein jaankari chahiye.', icon: Home },
  { label: 'Office Shifting', message: 'Mujhe office shifting ke baare mein jaankari chahiye.', icon: Building2 },
  { label: 'Packing Service', message: 'Mujhe packing service ke baare mein jaankari chahiye.', icon: Package },
  { label: 'Get a Quote', message: 'Mujhe quotation chahiye.', icon: BadgeDollarSign },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const conversationEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [isOpen, messages]);

  const sendMessage = async (content: string) => {
    const message = content.trim();
    if (!message || isLoading || message.length > 2000) return;

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: message }];
    setMessages(nextMessages);
    setInput('');
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          history: messages.slice(-10),
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { reply?: string; error?: string };
      if (!response.ok || !data.reply) throw new Error(data.error || 'Please try again in a moment.');
      const assistantMessage: ChatMessage = { role: 'assistant', content: data.reply };
      setMessages([...nextMessages, assistantMessage].slice(-20));
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Please try again in a moment.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    void sendMessage(input);
  };

  return (
    <>
      {isOpen && (
        <section
          className="fixed bottom-[13rem] right-3 z-[60] flex max-h-[min(32rem,calc(100dvh-15rem))] w-[calc(100vw-1.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-navy-200 bg-white shadow-2xl shadow-navy-950/25 sm:bottom-6 sm:right-6"
          aria-label="Saket Packers AI Assistant"
          role="dialog"
          aria-modal="false"
        >
          <header className="flex items-center justify-between bg-navy-800 px-4 py-3 text-white">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-400 text-navy-900">
                <Bot className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h2 className="truncate font-display text-lg font-bold">Saket Packers AI Assistant</h2>
                <p className="text-xs text-navy-100">Usually replies in a few seconds</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="ml-2 rounded-lg p-2 text-navy-100 transition-colors hover:bg-navy-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto bg-navy-50/50 p-3" aria-live="polite">
            <div className="mb-3 flex max-w-[90%] items-start gap-2">
              <Bot className="mt-1 h-4 w-4 shrink-0 text-navy-600" aria-hidden="true" />
              <p className="rounded-xl rounded-tl-sm bg-white px-3 py-2 text-sm leading-relaxed text-navy-800 shadow-sm">
                {WELCOME_MESSAGE}
              </p>
            </div>
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`mb-3 flex ${message.role === 'user' ? 'justify-end' : 'items-start gap-2'}`}
              >
                {message.role === 'assistant' && <Bot className="mt-1 h-4 w-4 shrink-0 text-navy-600" aria-hidden="true" />}
                <p
                  className={`max-w-[90%] whitespace-pre-wrap rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'rounded-br-sm bg-brand-600 text-white'
                      : 'rounded-tl-sm bg-white text-navy-800 shadow-sm'
                  }`}
                >
                  {message.content}
                </p>
              </div>
            ))}
            {isLoading && (
              <div className="mb-3 flex items-center gap-2 text-sm text-navy-500" aria-label="Assistant is typing">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                <span>Thinking...</span>
              </div>
            )}
            {error && <p className="mb-2 rounded-lg bg-brand-50 px-3 py-2 text-xs font-medium text-brand-700">{error}</p>}
            {!messages.length && (
              <div className="grid grid-cols-2 gap-2">
                {QUICK_ACTIONS.map(({ label, message, icon: Icon }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => void sendMessage(message)}
                    className="flex min-h-10 items-center gap-1.5 rounded-lg border border-navy-200 bg-white px-2 py-2 text-left text-xs font-semibold text-navy-700 transition-colors hover:border-brand-300 hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                    {label}
                  </button>
                ))}
              </div>
            )}
            <div ref={conversationEndRef} />
          </div>

          <div className="border-t border-navy-100 bg-white p-3">
            <div className="mb-2 flex gap-2">
              <a
                href={BUSINESS.tel}
                onClick={() => trackEvent('call_click', { location: 'chatbot' })}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-2 py-2 text-xs font-bold text-white hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call Now
              </a>
              <a
                href={BUSINESS.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { location: 'chatbot' })}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-leaf-600 px-2 py-2 text-xs font-bold text-white hover:bg-leaf-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf-500"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp Us
              </a>
            </div>
            <form className="flex gap-2" onSubmit={onSubmit}>
              <label className="sr-only" htmlFor="chat-message">Message</label>
              <input
                ref={inputRef}
                id="chat-message"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={2000}
                disabled={isLoading}
                placeholder="Type your message..."
                className="min-w-0 flex-1 rounded-lg border border-navy-200 px-3 py-2 text-sm text-navy-900 outline-none placeholder:text-navy-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 disabled:bg-navy-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-800 text-white transition-colors hover:bg-navy-700 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </div>
        </section>
      )}

      <button
        type="button"
        onClick={() => {
          setIsOpen((open) => !open);
        }}
        className="group fixed bottom-[9rem] right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-navy-800 text-white shadow-xl shadow-navy-950/30 transition-transform hover:scale-105 hover:bg-navy-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 sm:bottom-6 sm:right-24"
        aria-label="Chat with Saket Packers AI Assistant"
        aria-expanded={isOpen}
      >
        <span className="absolute inset-0 rounded-full bg-gold-400/20 transition-transform group-hover:scale-110" aria-hidden="true" />
        {isOpen ? <X className="relative h-6 w-6" aria-hidden="true" /> : <MessageCircle className="relative h-6 w-6" aria-hidden="true" />}
      </button>
    </>
  );
}
