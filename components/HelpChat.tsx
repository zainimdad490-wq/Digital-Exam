
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { HELP_PRESETS, SYSTEM_INSTRUCTION, ACADEMY_NAME } from '../constants';
import { GoogleGenAI } from "@google/genai";

const HelpChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([
    { text: `Welcome to ${ACADEMY_NAME} Portal. I am your Neural Assistant. How can I facilitate your session today?`, isBot: true }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg = { text, isBot: false };
    setHistory(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: text,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      const botText = response.text || "I encountered a synchronization error. Please retry.";
      setHistory(prev => [...prev, { text: botText, isBot: true }]);
    } catch (error) {
      setHistory(prev => [...prev, { text: "Network interruption in neural link. Verify connectivity.", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 md:w-96 bg-[#0a0a15] rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 flex flex-col h-[550px] border border-indigo-500/30">
          <div className="bg-indigo-600 p-6 flex justify-between items-center shadow-lg">
            <div>
              <h3 className="text-white font-black text-xs uppercase tracking-[0.3em]">Neural Assistant</h3>
              <p className="text-[8px] text-indigo-200 font-bold uppercase tracking-widest mt-1">Status: Online</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white opacity-60 hover:opacity-100 font-bold text-lg">✕</button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide bg-[#05050a]">
            {history.map((msg, i) => (
              <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-[11px] leading-relaxed font-bold ${
                  msg.isBot 
                  ? 'bg-white/5 text-indigo-100 rounded-tl-none border border-white/10' 
                  : 'bg-indigo-600 text-white rounded-tr-none shadow-lg'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10">
                   <div className="flex gap-1">
                      <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                   </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-[#0a0a15] border-t border-white/5">
            <div className="flex flex-wrap gap-2 mb-4">
              {HELP_PRESETS.map((q, i) => (
                <button 
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="bg-white/5 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 px-3 py-1.5 rounded-full text-[9px] font-black transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input 
                value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask anything..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[11px] font-bold text-white outline-none focus:border-indigo-500"
              />
              <button 
                onClick={() => sendMessage(input)}
                disabled={isLoading || !input.trim()}
                className="bg-indigo-600 text-white p-3 rounded-xl disabled:opacity-50"
              >
                ➔
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-[2rem] bg-indigo-600 hover:bg-indigo-700 shadow-[0_0_20px_rgba(99,102,241,0.4)] flex items-center justify-center transform active:scale-90 transition-all border-2 border-white/20 relative group"
      >
        <span className="text-white text-2xl font-black">AI</span>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full border-2 border-[#020205] animate-pulse"></div>
      </button>
    </div>
  );
};

export default HelpChat;
