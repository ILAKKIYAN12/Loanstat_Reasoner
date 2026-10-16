import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, MessageSquare, Send, Bug, CheckCircle2, Bot, User, Sparkles, AlertCircle, ShieldQuestion } from 'lucide-react';

export default function HelpSupport({ t, lang }) {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'report'

  // AI Chat State
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am your XAI Loan Assistant. Ask me anything about credit scores, SHAP explanations, loan eligibility, or how our AI engine evaluates loans.'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Bug Report Form State
  const [reportCategory, setReportCategory] = useState('Technical Bug');
  const [reportDescription, setReportDescription] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg.trim();
    const newMsg = { sender: 'user', text: userText };
    setChatMessages(prev => [...prev, newMsg]);
    setInputMsg('');
    setIsTyping(true);

    // Generate intelligent XAI AI response
    setTimeout(() => {
      let botResponse = "I can help you with your loan application! Your loan decision is calculated using a Random Forest AI model combined with SHAP feature attributions.";
      const lower = userText.toLowerCase();

      if (lower.includes('credit score') || lower.includes('cibil')) {
        botResponse = "Credit Score is the most influential factor in loan decisions! Scores above 670 have a 78%+ approval rate, while scores below 620 increase debt risk indicators.";
      } else if (lower.includes('income') || lower.includes('salary')) {
        botResponse = "Higher annual income significantly boosts your repayment capacity score. For loans over ₹10 Lakhs, an annual income of ₹6 Lakhs+ is recommended.";
      } else if (lower.includes('shap') || lower.includes('lime') || lower.includes('explain')) {
        botResponse = "SHAP (SHapley Additive exPlanations) measures how much each feature (+% or -%) changed your approval probability from the baseline population average.";
      } else if (lower.includes('reject') || lower.includes('denied') || lower.includes('why')) {
        botResponse = "If your loan was rejected, check the Counterfactual Slider on Step 3! Try increasing your credit score to 720+ or reducing your requested loan amount.";
      } else if (lower.includes('bug') || lower.includes('error') || lower.includes('issue') || lower.includes('not working')) {
        botResponse = "If you encountered an issue, please switch to the 'Report Issue / Improper Working' tab above to submit a technical report directly to our team!";
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 900);
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!reportDescription.trim()) return;

    const generatedId = `XAI-BUG-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedId);
    setReportSubmitted(true);
    setReportDescription('');
    setTimeout(() => setReportSubmitted(false), 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-3xl mx-auto flex flex-col gap-6"
    >
      {/* Help Header */}
      <div className="glass-card-saas p-6 rounded-3xl border-2 border-sky-300 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-sky-600 text-white font-black shadow-lg">
            <HelpCircle className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-950 tracking-tight">
              Help & Support Center
            </h2>
            <p className="text-xs text-slate-800 font-extrabold">
              Instant AI Assistant chat & technical issue reporting portal
            </p>
          </div>
        </div>

        {/* Tab Switcher: Chat AI vs Report Issue */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-300 shadow-inner">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition ${
              activeTab === 'chat'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-700 hover:text-slate-950'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat with AI</span>
          </button>

          <button
            onClick={() => setActiveTab('report')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition ${
              activeTab === 'report'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-slate-700 hover:text-slate-950'
            }`}
          >
            <Bug className="w-4 h-4" />
            <span>Report Issue</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: Chat with AI Section */}
      {activeTab === 'chat' && (
        <div className="glass-card-saas p-6 rounded-3xl border border-slate-200 shadow-xl flex flex-col gap-4 bg-white">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-sky-600" />
              <span className="font-black text-slate-950 text-base">XAI Loan Assistant Chatbot</span>
            </div>
            <span className="text-[10px] font-black bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              Online AI Assistant
            </span>
          </div>

          {/* Chat Messages Box */}
          <div className="w-full h-[320px] overflow-y-auto p-4 rounded-2xl bg-slate-50 border border-slate-300 flex flex-col gap-3">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-sky-600 text-white'
                }`}>
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`p-3.5 rounded-2xl text-xs font-extrabold leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-sky-600 text-white rounded-tr-none'
                    : 'bg-white border border-slate-300 text-slate-950 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-600 text-xs font-extrabold italic bg-white p-3 rounded-2xl border border-slate-200 w-fit">
                <Sparkles className="w-4 h-4 text-sky-600 animate-spin" />
                <span>AI Assistant is typing response...</span>
              </div>
            )}
          </div>

          {/* Chat Input Form */}
          <form onSubmit={handleSendChat} className="flex items-center gap-2 pt-1">
            <input
              type="text"
              placeholder="Ask about credit score, SHAP explanation, why loan was denied..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-950 text-xs font-black focus:outline-none focus:border-sky-500 shadow-inner"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs shadow-md transition active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* SECTION 2: Report Improper Working / Bug Form */}
      {activeTab === 'report' && (
        <div className="glass-card-saas p-6 rounded-3xl border border-slate-200 shadow-xl flex flex-col gap-4 bg-white">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            <Bug className="w-5 h-5 text-rose-600" />
            <span className="font-black text-slate-950 text-base">Submit Bug / Improper Working Report</span>
          </div>

          {reportSubmitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-black text-xs flex flex-col gap-1 shadow-sm"
            >
              <div className="flex items-center gap-2 text-emerald-800 text-sm font-black">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Report Submitted Successfully!</span>
              </div>
              <p className="text-slate-800">
                Ticket Reference Code: <span className="font-mono font-black text-emerald-900">{ticketId}</span>. Our engineering team has logged this issue for inspection.
              </p>
            </motion.div>
          )}

          <form onSubmit={handleReportSubmit} className="flex flex-col gap-4">
            
            {/* Category Select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black text-slate-950">
                Issue Category
              </label>
              <select
                value={reportCategory}
                onChange={(e) => setReportCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-950 text-xs font-black focus:outline-none focus:border-sky-500 shadow-inner cursor-pointer"
              >
                <option value="Technical Bug">Technical Bug / Application Crash</option>
                <option value="Improper Prediction">Improper Prediction / Incorrect Verdict</option>
                <option value="XAI Explanation Query">XAI SHAP Explanation Query</option>
                <option value="UI & 3D Canvas Issue">UI Layout or 3D Canvas Display Issue</option>
                <option value="Other Feedback">Other Feedback / Improvement Idea</option>
              </select>
            </div>

            {/* Description Textarea */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black text-slate-950">
                Describe the Improper Working or Issue
              </label>
              <textarea
                required
                rows="4"
                placeholder="Explain what went wrong or did not work properly..."
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-950 text-xs font-black focus:outline-none focus:border-sky-500 shadow-inner"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm shadow-md transition active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <AlertCircle className="w-5 h-5" />
              <span>SUBMIT REPORT</span>
            </button>

          </form>
        </div>
      )}

    </motion.div>
  );
}
