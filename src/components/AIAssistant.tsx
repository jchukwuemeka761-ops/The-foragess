import React, { useState, useRef, useEffect } from 'react';
import { useNavedaData } from '../context/DataContext';
import { NAVEDA_SITE } from '../data/navedaData';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Clock,
  Phone,
  MessageCircle,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  actionUrl?: string;
  actionText?: string;
}

export const AIAssistant: React.FC = () => {
  const { dishes, drinks, pitchPackages } = useNavedaData();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Hello and welcome to Naveda World Bites And Brews! 🌟 I am your 24-hour AI Customer Assistant. How can I assist you today? You can ask me about our 38 dishes, prices in Naira, 5-a-side AstroTurf pitch bookings, weekend live highlife bands, or VIP table reservations!',
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Context summary to pass to the AI
  const getMenuContext = () => {
    const topDishes = dishes
      .slice(0, 15)
      .map((d) => `${d.name} (${d.price}, ${d.categoryTitle})`)
      .join('; ');
    const topDrinks = drinks
      .slice(0, 8)
      .map((dr) => `${dr.name} (${dr.price})`)
      .join('; ');
    const turf = pitchPackages.map((p) => `${p.title}: ${p.rate}`).join('; ');
    return `Dishes: ${topDishes}. Drinks: ${topDrinks}. Turf: ${turf}.`;
  };

  // Smart Instant Rule-Based Fallback Engine
  const generateFallbackAnswer = (query: string): { text: string; actionUrl?: string; actionText?: string } => {
    const q = query.toLowerCase();

    if (q.includes('pitch') || q.includes('turf') || q.includes('football') || q.includes('soccer') || q.includes('5-a-side')) {
      const dayPkg = pitchPackages.find((p) => p.id.includes('day')) || pitchPackages[0];
      const nightPkg = pitchPackages.find((p) => p.id.includes('night')) || pitchPackages[1];
      return {
        text: `⚽ The Arena: All-Weather 5-A-Side AstroTurf Pitch rates:\n• Daylight Match Slot (6:00 AM – 6:00 PM): ${dayPkg?.rate || '₦15,000 / hour'}\n• Night Floodlit Championship Slot (6:00 PM – Late): ${nightPkg?.rate || '₦22,000 / hour'}\n\nBoth slots include pro mini goals, perimeter safety net, and match balls. Would you like to book a slot now?`,
        actionUrl: `https://wa.me/${NAVEDA_SITE.whatsappRaw}?text=${encodeURIComponent('Hello Naveda World, I would like to book a 5-a-side AstroTurf pitch slot.')}`,
        actionText: 'Book Pitch on WhatsApp'
      };
    }

    if (q.includes('band') || q.includes('live') || q.includes('music') || q.includes('highlife') || q.includes('nightlife')) {
      return {
        text: `🎺 Weekend Live Highlife Band Schedule:\n• Friday Night (8:00 PM): Eastern Highlife Fiesta & Palm Wine Beats (Resident Red Cap Band)\n• Saturday Night (8:30 PM): Afrobeats Live Sessions & Guest Saxophonist\n• Sunday Sundown (6:00 PM): Acoustic Trio & Old School Highlife\n\nVIP stage tables and bottle service are available round the clock!`,
        actionUrl: `https://wa.me/${NAVEDA_SITE.whatsappRaw}?text=${encodeURIComponent('Hello Naveda World, I would like to reserve a VIP table for the Weekend Live Highlife Band.')}`,
        actionText: 'Reserve VIP Table'
      };
    }

    if (q.includes('drink') || q.includes('beer') || q.includes('bottle') || q.includes('champagne') || q.includes('hennessy') || q.includes('wine')) {
      const drinkHighlights = drinks.slice(0, 5).map((d) => `• ${d.name}: ${d.price}`).join('\n');
      return {
        text: `🍾 Here are our popular drinks & VIP bottles:\n${drinkHighlights}\n\nWe also serve chilled Heineken, Star Radler, draught beer, and our signature Royal Chapman!`,
        actionUrl: `https://wa.me/${NAVEDA_SITE.whatsappRaw}?text=${encodeURIComponent('Hello Naveda Lounge, I would like to order drinks and bottles.')}`,
        actionText: 'Order Drinks on WhatsApp'
      };
    }

    if (q.includes('location') || q.includes('address') || q.includes('where') || q.includes('find you')) {
      return {
        text: `📍 Naveda World is located at:\n${NAVEDA_SITE.address}\n\nLandmark: ${NAVEDA_SITE.landmark}.\nWe are open 24 Hours Every Single Day with secure guarded parking!`,
        actionUrl: NAVEDA_SITE.googleMapsUrl,
        actionText: 'Open in Google Maps'
      };
    }

    if (q.includes('open') || q.includes('time') || q.includes('hour')) {
      return {
        text: `⏰ Naveda World Bites And Brews is open 24 Hours Daily, 7 days a week! Our kitchen, dining lounge, AstroTurf pitch, and security operate round the clock.`,
        actionUrl: `https://wa.me/${NAVEDA_SITE.whatsappRaw}?text=${encodeURIComponent('Hello Naveda World, I am arriving shortly.')}`,
        actionText: 'Chat on WhatsApp'
      };
    }

    // Default dish recommendation
    const sampleDishes = dishes.slice(0, 4).map((d) => `• ${d.name} (${d.price}) - ${d.portion}`).join('\n');
    return {
      text: `🍽️ We offer 38 spectacular unique dishes! Here are some customer favorites:\n${sampleDishes}\n\nAll meals are prepared fresh 24 hours daily. Would you like to order any of these?`,
      actionUrl: `https://wa.me/${NAVEDA_SITE.whatsappRaw}?text=${encodeURIComponent('Hello Naveda World kitchen, I would like to place an order from the menu.')}`,
      actionText: 'Order Food on WhatsApp'
    };
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const historyPayload = messages.slice(-4).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text
      }));

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          message: query,
          history: historyPayload,
          menuContext: getMenuContext()
        })
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error('API request failed');
      }

      const data = await res.json();
      const reply = data.reply || data.text;

      let actionUrl: string | undefined = undefined;
      let actionText: string | undefined = undefined;

      const qLower = query.toLowerCase();
      if (qLower.includes('order') || qLower.includes('soup') || qLower.includes('dish') || qLower.includes('food')) {
        actionUrl = `https://wa.me/${NAVEDA_SITE.whatsappRaw}?text=${encodeURIComponent(`Hello Naveda World, I would like to order: ${query}`)}`;
        actionText = 'Order on WhatsApp (+234 903 977 7679)';
      } else if (qLower.includes('book') || qLower.includes('pitch') || qLower.includes('table') || qLower.includes('turf')) {
        actionUrl = `https://wa.me/${NAVEDA_SITE.whatsappRaw}?text=${encodeURIComponent(`Hello Naveda World, I would like to make a reservation: ${query}`)}`;
        actionText = 'Reserve via WhatsApp';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionUrl,
          actionText
        }
      ]);
    } catch {
      // Graceful instant fallback
      const fallback = generateFallbackAnswer(query);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: fallback.text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionUrl: fallback.actionUrl,
          actionText: fallback.actionText
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    'Recommend top native soups',
    'How much is the turf pitch?',
    'Live highlife band schedule?',
    'What drinks & champagne do you have?',
    'Are you open 24 hours right now?'
  ];

  return (
    <>
      {/* Floating Trigger Button (Bottom Left, distinct from WhatsApp on the right) */}
      {!isOpen && (
        <div className="fixed bottom-6 left-6 z-40">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 rounded-full border border-amber-500/40 bg-neutral-900/95 px-4 py-3 text-sm font-bold text-white shadow-2xl shadow-amber-500/20 backdrop-blur-xl transition-all hover:bg-neutral-800 hover:border-amber-400 hover:scale-105 active:scale-95"
            aria-label="Open 24/7 AI Customer Assistant"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-neutral-950 shadow-md">
              <Bot className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-neutral-900" />
              </span>
            </div>

            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-xs font-black text-amber-400 uppercase tracking-wider">
                  24/7 AI Service
                </span>
                <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 text-[9px] font-bold text-emerald-400 border border-emerald-500/30">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-neutral-300 font-medium hidden sm:block">
                Ask about menu, prices & turf
              </p>
            </div>
          </button>
        </div>
      )}

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[85vh] h-[550px] flex flex-col rounded-3xl border border-amber-500/40 bg-neutral-950/98 shadow-2xl shadow-black/90 backdrop-blur-2xl overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="border-b border-neutral-800 bg-neutral-900/90 px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-white p-1 shadow-md">
                <img
                  src="/assets/aistudio/naveda_logo.png"
                  alt="Naveda Logo"
                  className="h-full w-full object-contain"
                />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-neutral-900" />
              </div>
              <div>
                <h3 className="font-display text-sm font-extrabold text-white flex items-center gap-1">
                  Naveda 24H Assistant
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                </h3>
                <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Concierge · Open 24/7
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                title="Close Assistant"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="bg-neutral-900/60 px-3 py-2 border-b border-neutral-800 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5 text-[11px]">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="shrink-0 rounded-full border border-white/10 bg-neutral-800/80 px-2.5 py-1 text-neutral-300 hover:border-amber-400 hover:text-amber-300 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div className={`space-y-1.5 max-w-[85%]`}>
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 leading-relaxed whitespace-pre-wrap ${
                      m.sender === 'user'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-950 font-medium'
                        : 'bg-neutral-900 text-neutral-200 border border-neutral-800'
                    }`}
                  >
                    {m.text}

                    {/* Action Button inside AI message */}
                    {m.actionUrl && (
                      <div className="mt-2.5 pt-2 border-t border-neutral-800">
                        <a
                          href={m.actionUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1.5 text-[11px] font-bold text-white shadow hover:bg-emerald-500 transition-colors"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          {m.actionText || 'Connect on WhatsApp'}
                        </a>
                      </div>
                    )}
                  </div>
                  <p
                    className={`text-[9px] text-neutral-500 ${
                      m.sender === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {m.time}
                  </p>
                </div>

                {m.sender === 'user' && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-neutral-800 text-neutral-300">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-neutral-400 text-xs">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400">
                  <Bot className="h-4 w-4 animate-spin" />
                </div>
                <div className="rounded-2xl bg-neutral-900 border border-neutral-800 px-3 py-2 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-neutral-400 ml-1">Naveda Concierge is typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="border-t border-neutral-800 bg-neutral-900/90 p-3 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything about dishes, prices, turf..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 rounded-xl border border-neutral-700 bg-neutral-950 px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-950 transition-all hover:scale-105 disabled:opacity-50 disabled:scale-100"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
