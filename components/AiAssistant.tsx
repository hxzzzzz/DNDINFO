import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, X, Bot } from 'lucide-react';
import { getAiRecommendation } from '../services/geminiService';
import { ModuleData, ChatMessage } from '../types';

interface AiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  modules: ModuleData[];
}

const AiAssistant: React.FC<AiAssistantProps> = ({ isOpen, onClose, modules }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '你好，冒险者。我是档案馆员。告诉我你在寻找什么样的冒险（例如，“一个带有亡灵的3级地牢”），我会为你指引方向。' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    // Call Gemini Service
    const aiResponse = await getAiRecommendation(userMsg, modules);

    setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-slate-900 border-l border-slate-700 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      
      {/* Header */}
      <div className="pt-safe-top">
          <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800">
            <div className="flex items-center gap-2 text-amber-500">
            <Sparkles size={20} />
            <h2 className="font-heading font-bold text-lg">档案馆员 (AI)</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white p-2 active:bg-slate-700 rounded-full transition-colors">
            <X size={24} />
            </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 overscroll-contain">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-amber-700 text-white rounded-br-none' 
                : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
            }`}>
              {msg.role === 'model' && (
                 <div className="flex items-center gap-2 mb-1 text-amber-500/70 text-xs font-bold uppercase tracking-wider">
                   <Bot size={12} /> 档案馆员
                 </div>
              )}
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 rounded-bl-none">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-slate-800 border-t border-slate-700 pb-safe-bottom">
        <div className="p-4 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="询问冒险推荐..."
            className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all placeholder-slate-500"
            style={{fontSize: '16px'}}
          />
          <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-amber-500 hover:text-amber-400 disabled:opacity-50 p-2 active:bg-slate-700 rounded-md transition-all"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;