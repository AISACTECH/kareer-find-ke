import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Send, Loader2, Bot, Minimize2, Maximize2, Sparkles } from 'lucide-react';
import MessageBubble from './MessageBubble';

const AGENT_NAME = 'career_advisor';

export default function CareerAdvisorWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const startConversation = async () => {
    setIsStarting(true);
    // Load assessment context from localStorage
    const stored = localStorage.getItem('pathfinder_assessment');
    const assessment = stored ? JSON.parse(stored) : null;

    const metadata = {
      name: 'Career Advisor Session',
      assessment_context: assessment ? JSON.stringify({
        student_name: assessment.student_name,
        mean_grade: assessment.academic_data?.meanGrade,
        subjects: assessment.academic_data?.subjects,
        interests: assessment.interest_ratings?.ratings,
        personality: assessment.personality_scores?.axes
      }) : 'No assessment data yet'
    };

    const conv = await base44.agents.createConversation({
      agent_name: AGENT_NAME,
      metadata
    });
    setConversation(conv);
    setMessages(conv.messages || []);

    // Send greeting context
    const greetingMsg = assessment
      ? `Hello! I'm ${assessment.student_name || 'a student'} using PathFinder KE. My KCSE mean grade is ${assessment.academic_data?.meanGrade || 'not set yet'}. I'd like career guidance.`
      : `Hello! I'm using PathFinder KE and need career guidance. I haven't taken the assessment yet.`;

    await sendMessage(conv, greetingMsg);
    setIsStarting(false);
  };

  const sendMessage = async (conv, text) => {
    const targetConv = conv || conversation;
    if (!targetConv || !text.trim()) return;

    setIsSending(true);
    setInput('');

    const unsubscribe = base44.agents.subscribeToConversation(targetConv.id, (data) => {
      setMessages([...data.messages]);
    });

    await base44.agents.addMessage(targetConv, {
      role: 'user',
      content: text.trim()
    });

    setTimeout(() => {
      unsubscribe();
      setIsSending(false);
    }, 8000);
  };

  const handleOpen = async () => {
    setIsOpen(true);
    setIsMinimized(false);
    if (!conversation) {
      await startConversation();
    }
  };

  const handleSend = () => {
    if (input.trim() && !isSending) {
      sendMessage(null, input);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    'What courses can I study with B mean grade?',
    'How do I calculate my cluster points?',
    'What are the KUCCPS cutoffs for Medicine?',
    'What careers suit someone good at Maths?'
  ];

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
            style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 80px)' }}
          >
            <button
              onClick={handleOpen}
              className="group relative w-16 h-16 rounded-full bg-[#d4a853] hover:bg-[#c49843] shadow-2xl shadow-[#d4a853]/40 flex items-center justify-center transition-all hover:scale-110"
            >
              <Bot className="w-7 h-7 text-[#0a0f1e]" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0a0f1e] animate-pulse" />
              <div className="absolute right-full mr-3 bg-[#0d1526] text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-[#1e3a5f]/40 shadow-lg">
                AI Career Advisor
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed z-50 flex flex-col"
            style={{
              bottom: 'calc(env(safe-area-inset-bottom, 0px) + 80px)',
              right: '24px',
              width: 'min(420px, calc(100vw - 48px))',
              height: isMinimized ? 'auto' : 'min(600px, calc(100vh - 160px))'
            }}
          >
            <div className="flex flex-col h-full rounded-2xl overflow-hidden border border-[#1e3a5f]/60 bg-[#0d1526] shadow-2xl shadow-black/50">
              
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3 bg-[#0a0f1e] border-b border-[#1e3a5f]/40 flex-shrink-0">
                <div className="w-9 h-9 rounded-xl bg-[#d4a853]/20 border border-[#d4a853]/30 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#d4a853]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">AI Career Advisor</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-emerald-400">Online — PathFinder KE</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 rounded-lg hover:bg-[#1e3a5f]/40 text-slate-400 hover:text-white transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-red-900/30 text-slate-400 hover:text-red-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              {!isMinimized && (
                <>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
                    {isStarting ? (
                      <div className="flex flex-col items-center justify-center h-full gap-4 py-8">
                        <div className="w-14 h-14 rounded-2xl bg-[#d4a853]/10 border border-[#d4a853]/20 flex items-center justify-center">
                          <Sparkles className="w-7 h-7 text-[#d4a853] animate-pulse" />
                        </div>
                        <div className="text-center">
                          <p className="text-white font-medium text-sm">Initializing your advisor...</p>
                          <p className="text-slate-400 text-xs mt-1">Loading your assessment profile</p>
                        </div>
                        <Loader2 className="w-5 h-5 text-[#d4a853] animate-spin" />
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full gap-4 py-8">
                        <div className="w-14 h-14 rounded-2xl bg-[#d4a853]/10 border border-[#d4a853]/20 flex items-center justify-center">
                          <Bot className="w-7 h-7 text-[#d4a853]" />
                        </div>
                        <p className="text-slate-400 text-sm text-center">Starting session...</p>
                      </div>
                    ) : (
                      <>
                        {messages.map((msg, idx) => (
                          <MessageBubble key={idx} message={msg} />
                        ))}
                        {isSending && (
                          <div className="flex gap-2 items-center">
                            <div className="w-6 h-6 rounded-full bg-[#d4a853]/20 flex items-center justify-center flex-shrink-0">
                              <Bot className="w-3 h-3 text-[#d4a853]" />
                            </div>
                            <div className="bg-[#1e3a5f]/40 border border-[#1e3a5f]/60 rounded-2xl px-4 py-2.5">
                              <div className="flex gap-1">
                                {[0, 1, 2].map(i => (
                                  <div key={i} className="w-2 h-2 rounded-full bg-[#d4a853]/60 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </div>

                  {/* Quick Questions */}
                  {messages.length <= 2 && !isStarting && (
                    <div className="px-4 pb-2 flex-shrink-0">
                      <p className="text-xs text-slate-500 mb-2">Quick questions:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {quickQuestions.map((q, i) => (
                          <button
                            key={i}
                            onClick={() => sendMessage(null, q)}
                            disabled={isSending}
                            className="text-xs px-2.5 py-1.5 rounded-lg bg-[#1e3a5f]/40 border border-[#1e3a5f]/60 text-slate-300 hover:text-[#d4a853] hover:border-[#d4a853]/30 transition-colors disabled:opacity-50"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="px-4 py-3 border-t border-[#1e3a5f]/40 flex-shrink-0">
                    <div className="flex gap-2 items-end">
                      <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about careers, grades, universities..."
                        disabled={isSending || isStarting}
                        rows={1}
                        className="flex-1 bg-[#0a0f1e] border border-[#1e3a5f]/50 text-white placeholder-slate-500 text-sm rounded-xl px-3 py-2.5 resize-none focus:outline-none focus:border-[#d4a853]/50 disabled:opacity-50"
                        style={{ maxHeight: '100px', minHeight: '40px' }}
                        onInput={(e) => {
                          e.target.style.height = 'auto';
                          e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
                        }}
                      />
                      <Button
                        onClick={handleSend}
                        disabled={!input.trim() || isSending || isStarting}
                        size="icon"
                        className="w-10 h-10 rounded-xl bg-[#d4a853] hover:bg-[#c49843] text-[#0a0f1e] flex-shrink-0 disabled:opacity-40"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5 text-center">AI advisor — for guidance only, not official KUCCPS data</p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
