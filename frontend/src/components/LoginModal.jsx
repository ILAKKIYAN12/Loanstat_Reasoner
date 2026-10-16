import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Mail, Lock, LogIn, Sparkles, UserCheck } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid Gmail / Email address');
      return;
    }
    if (!password || password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }
    setError('');
    onLoginSuccess({ email, name: email.split('@')[0] });
    onClose();
  };

  const handleQuickDemo = () => {
    onLoginSuccess({ email: 'demo.user@gmail.com', name: 'Demo Applicant' });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="w-full max-w-md glass-panel-trending p-8 rounded-3xl border-2 border-indigo-500/40 shadow-2xl relative overflow-hidden"
        >
          {/* Header Banner */}
          <div className="flex flex-col items-center text-center gap-2 mb-6">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/30">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black trending-text-gradient">
              Trust the AI — User Login
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">
              Sign in with your Gmail to access personalized AI Loan Approval
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-bold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                Gmail / Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="w-5 h-5 absolute left-3.5 text-indigo-500" />
                <input
                  type="email"
                  placeholder="user@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/90 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-bold focus:outline-none focus:border-indigo-500 shadow-sm"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="w-5 h-5 absolute left-3.5 text-indigo-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/90 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-bold focus:outline-none focus:border-indigo-500 shadow-sm"
                />
              </div>
            </div>

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-3.5 rounded-2xl trending-btn-gradient font-black text-base shadow-xl flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              <LogIn className="w-5 h-5" />
              <span>Sign In with Gmail</span>
            </motion.button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold">Or for live showcase:</span>
            <button
              onClick={handleQuickDemo}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-600 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-500/40 text-xs font-extrabold transition shadow-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>⚡ 1-Click Quick Demo Login</span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
