import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, User, Globe, Radio, LogIn, ChevronRight, Home, CheckSquare, BarChart2, ShieldCheck, Settings, HelpCircle, Bell, Sun, Moon, CheckCircle } from 'lucide-react';

export default function Header({ lang, setLang, theme, setTheme, activeStep, setActiveStep, t, isOffline, user, onOpenLogin, onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const notifications = [
    { id: 1, text: "⚡ XAI Engine updated to Random Forest v2.4", time: "Just now", icon: <CheckCircle className="w-4 h-4 text-emerald-500" /> },
    { id: 2, text: "✅ Loan Certificate generated & verified", time: "2m ago", icon: <Sparkles className="w-4 h-4 text-sky-500" /> },
    { id: 3, text: "📊 SHAP & LIME explanation vectors loaded", time: "5m ago", icon: <ShieldCheck className="w-4 h-4 text-purple-500" /> }
  ];

  const navItems = [
    { id: 1, label: t.step1Tab, icon: <Home className="w-5 h-5 text-sky-600 dark:text-sky-400" />, title: "Applicant Input" },
    { id: 2, label: 'Verdict & XAI Reason', icon: <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />, title: "Verdict & Reason" },
    { id: 3, label: '3D Financial Risk Matrix', icon: <BarChart2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />, title: "3D Risk Matrix" },
    { id: 4, label: t.insightsTab, icon: <ShieldCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />, title: "Global Insights" },
    { id: 5, label: 'Profile Settings', icon: <Settings className="w-5 h-5 text-pink-600 dark:text-pink-400" />, title: "My Profile" },
    { id: 6, label: 'Help & Support Assistant', icon: <HelpCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />, title: "Help & Support" },
  ];

  const handleNavClick = (id) => {
    setActiveStep(id);
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <header className="w-full sticky top-0 z-40 px-3 sm:px-6 py-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-b-2 border-slate-200 dark:border-slate-800 shadow-sm pl-20 sm:pl-24">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Main Title Logo "Trust the AI" */}
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-sky-500 via-blue-600 to-purple-600 shadow-md shadow-sky-500/20 shrink-0">
              <Sparkles className="w-5 h-5 text-white font-black animate-spin" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight trending-title-text drop-shadow-sm whitespace-nowrap">
              {t.appTitle}
            </h1>
          </div>

          {/* Far-Right Controls */}
          <div className="flex items-center gap-2 shrink-0 relative">
            {isOffline && (
              <div className="flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-300 text-[10px] px-2.5 py-1 rounded-full font-extrabold">
                <Radio className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                <span className="hidden sm:inline">Offline ML</span>
              </div>
            )}

            {/* BUTTON 1: Notification Icon Button */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-2 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white transition-all shadow-sm active:scale-95 cursor-pointer relative"
                title="Notifications"
              >
                <Bell className="w-4.5 h-4.5 text-sky-600 dark:text-sky-400" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 border-2 border-white dark:border-slate-900 rounded-full animate-ping" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 border-2 border-white dark:border-slate-900 rounded-full" />
              </button>

              {/* Notification Dropdown Panel */}
              <AnimatePresence>
                {isNotifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-3.5 z-50 flex flex-col gap-2.5"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                      <span className="text-xs font-black text-slate-950 dark:text-white flex items-center gap-1.5">
                        <Bell className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                        System Notifications
                      </span>
                      <span className="text-[10px] bg-sky-100 dark:bg-sky-950 text-sky-900 dark:text-sky-300 font-bold px-2 py-0.5 rounded-full">
                        3 New
                      </span>
                    </div>

                    <div className="flex flex-col gap-2">
                      {notifications.map((n) => (
                        <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5 text-xs">
                          <div className="mt-0.5">{n.icon}</div>
                          <div className="flex flex-col">
                            <span className="font-extrabold text-slate-950 dark:text-slate-100 leading-snug">{n.text}</span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">{n.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* BUTTON 2: Dark Mode / Light Mode Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-2 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
              title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === 'dark' ? (
                <Sun className="w-4.5 h-4.5 text-amber-400" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-indigo-600" />
              )}
            </button>

            {/* Profile Button */}
            {user ? (
              <button
                onClick={() => handleNavClick(5)}
                className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-2 border-sky-500 px-3 py-1.5 rounded-xl shadow-sm transition cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-500 to-purple-600 text-white font-black flex items-center justify-center text-xs">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
                <span className="text-xs font-black text-slate-900 dark:text-white hidden sm:inline truncate max-w-[100px]">
                  {user.name || user.email}
                </span>
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-700 text-white px-3.5 py-2 rounded-xl text-xs font-black shadow-md transition active:scale-95 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}

            <button
              onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
              className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-black transition shadow-sm"
            >
              <Globe className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>{lang === 'en' ? 'TA' : 'EN'}</span>
            </button>
          </div>

        </div>
      </header>

      {/* Fully Connected Left Sidebar Navigation Dock */}
      <aside className="fixed top-0 left-0 h-full z-50 flex">
        
        {/* Collapsed Connected Left Icon Dock */}
        <div className="w-16 sm:w-18 h-full bg-white dark:bg-slate-900 border-r-2 border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col items-center py-3 justify-between z-50">
          
          {/* Top Connected MENU Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border-2 border-sky-500 text-slate-900 dark:text-white transition-all shadow-sm active:scale-95 cursor-pointer flex flex-col items-center justify-center gap-0.5"
            title={isSidebarOpen ? "Close Menu" : "Open Menu"}
          >
            {isSidebarOpen ? (
              <X className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            ) : (
              <Menu className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            )}
            <span className="text-[9px] font-black text-slate-900 dark:text-white">MENU</span>
          </button>

          {/* Connected Vertical Icons */}
          <div className="flex flex-col gap-2.5 my-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`p-2.5 rounded-xl transition-all duration-200 cursor-pointer relative group ${
                  activeStep === item.id
                    ? 'bg-sky-50 dark:bg-sky-950/80 border-2 border-sky-500 scale-105 shadow-sm'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 opacity-80 hover:opacity-100'
                }`}
                title={item.title}
              >
                {item.icon}
                <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-slate-900 dark:bg-slate-800 text-white text-[11px] font-black px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-50 border border-slate-700">
                  {item.title}
                </span>
              </button>
            ))}
          </div>

          {/* User Profile Avatar Icon */}
          <button
            onClick={() => handleNavClick(5)}
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-purple-600 text-white font-black flex items-center justify-center text-xs shadow-md hover:scale-105 transition cursor-pointer"
            title="User Profile"
          >
            {user ? (user.name ? user.name[0].toUpperCase() : 'U') : <User className="w-4 h-4" />}
          </button>

        </div>

        {/* Expanded Drawer Panel */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm -z-10"
              />

              <motion.div
                initial={{ x: -280, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -280, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 280 }}
                className="w-72 h-full bg-white dark:bg-slate-900 border-r-2 border-sky-400 p-5 flex flex-col justify-between shadow-2xl z-40 overflow-y-auto"
              >
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-gradient-to-tr from-sky-500 to-purple-600 text-white font-black">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <span className="font-black text-slate-950 dark:text-white text-xl trending-title-text">Trust the AI</span>
                    </div>
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-950 transition cursor-pointer"
                      title="Close Drawer"
                    >
                      <X className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    </button>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-sky-700 dark:text-sky-400 px-1">
                      Full Navigation Pages
                    </span>
                    {navItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`flex items-center justify-between p-3.5 rounded-xl border-2 transition-all text-left font-extrabold text-xs cursor-pointer ${
                          activeStep === item.id
                            ? 'bg-sky-50 dark:bg-sky-950/80 border-sky-500 text-sky-950 dark:text-white shadow-sm font-black'
                            : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-950'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          {item.icon}
                          <span>{item.label}</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2.5">
                  {user ? (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                        <span className="text-xs font-black text-slate-900 dark:text-white truncate max-w-[120px]">{user.name || user.email}</span>
                      </div>
                      <button
                        onClick={onLogout}
                        className="text-xs font-black text-rose-600 hover:underline"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        onOpenLogin();
                        setIsSidebarOpen(false);
                      }}
                      className="w-full py-3 rounded-xl bg-sky-600 text-white font-black text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Gmail Login</span>
                    </button>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </aside>
    </>
  );
}
