import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, CreditCard, Percent, Briefcase, Zap, Sparkles, Activity } from 'lucide-react';

export default function Step1Input({ inputData, setInputData, onApplyPreset, onSubmit, t }) {
  const handleChange = (field, val) => {
    setInputData(prev => ({ ...prev, [field]: Number(val) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mainEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="w-full flex flex-col gap-5"
    >
      {/* Visual Preset Profiles Bar */}
      <div className="glass-card-saas p-4 sm:p-5 rounded-3xl flex flex-col gap-3 border-3 border-sky-400 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-sky-900 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-600 animate-spin" />
            {t.presetTitle}
          </h3>
          <span className="text-[11px] bg-sky-100 text-sky-950 border border-sky-400 px-2.5 py-0.5 rounded-full font-black flex items-center gap-1">
            <Activity className="w-3 h-3 text-emerald-600 animate-pulse" />
            INR Autofill
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Student Profile Card */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onApplyPreset('student')}
            className="flex items-center gap-3 p-3 rounded-2xl bg-white hover:bg-sky-50 border-2 border-sky-400 text-slate-900 font-extrabold text-xs sm:text-sm shadow-sm transition-all text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-sky-500 shadow-md shrink-0">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=120&auto=format&fit=crop&q=80"
                alt="Student"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
            </div>
            <div>
              <div className="font-black text-slate-950">{t.studentPreset}</div>
              <div className="text-[10px] text-sky-800 font-extrabold">₹2.4L • 610 CS</div>
            </div>
          </motion.button>

          {/* Business Owner Profile Card */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onApplyPreset('business')}
            className="flex items-center gap-3 p-3 rounded-2xl bg-white hover:bg-purple-50 border-2 border-purple-400 text-slate-900 font-extrabold text-xs sm:text-sm shadow-sm transition-all text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-purple-500 shadow-md shrink-0">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&auto=format&fit=crop&q=80"
                alt="Business Owner"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
            </div>
            <div>
              <div className="font-black text-slate-950">{t.businessPreset}</div>
              <div className="text-[10px] text-purple-800 font-extrabold">₹24L • 780 CS</div>
            </div>
          </motion.button>

          {/* Home Loan Profile Card */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onApplyPreset('homeLoan')}
            className="flex items-center gap-3 p-3 rounded-2xl bg-white hover:bg-emerald-50 border-2 border-emerald-400 text-slate-900 font-extrabold text-xs sm:text-sm shadow-sm transition-all text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-emerald-500 shadow-md shrink-0">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=120&auto=format&fit=crop&q=80"
                alt="Home Loan"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
            </div>
            <div>
              <div className="font-black text-slate-950">{t.homeLoanPreset}</div>
              <div className="text-[10px] text-emerald-800 font-extrabold">₹12.5L • 720 CS</div>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Sliders Grid with Ultra-High Visibility Explicit Slider Bar Lines */}
      <div className="glass-card-saas p-5 sm:p-6 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-5 border-3 border-sky-400 shadow-xl">
        
        {/* Income Slider */}
        <div className="flex flex-col gap-3 bg-white p-4 rounded-2xl border-2 border-emerald-400 shadow-md">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="flex items-center gap-2 text-slate-950 font-black">
              <span className="w-5 h-5 flex items-center justify-center text-emerald-800 font-black text-sm bg-emerald-100 rounded-md border border-emerald-300">₹</span>
              {t.incomeLabel}
            </span>
            <span className="font-mono text-emerald-900 font-black text-base px-3 py-1 rounded-xl bg-emerald-50 border-2 border-emerald-400 shadow-sm">
              ₹{inputData.income.toLocaleString('en-IN')}
            </span>
          </div>
          
          <div className="relative w-full py-1">
            <input
              type="range"
              min="150000"
              max="5000000"
              step="25000"
              value={inputData.income}
              onChange={(e) => handleChange('income', e.target.value)}
              className="w-full h-4 rounded-full appearance-none cursor-pointer border-2 border-slate-700 shadow-inner"
              style={{
                background: `linear-gradient(to right, #10b981 0%, #10b981 ${((inputData.income - 150000) / (5000000 - 150000)) * 100}%, #e2e8f0 ${((inputData.income - 150000) / (5000000 - 150000)) * 100}%, #e2e8f0 100%)`
              }}
            />
          </div>
        </div>

        {/* Credit Score Slider */}
        <div className="flex flex-col gap-3 bg-white p-4 rounded-2xl border-2 border-sky-400 shadow-md">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="flex items-center gap-2 text-slate-950 font-black">
              <ShieldAlert className="w-5 h-5 text-sky-800 p-0.5 bg-sky-100 rounded-md border border-sky-300" />
              {t.creditScoreLabel}
            </span>
            <span className={`font-mono font-black text-base px-3 py-1 rounded-xl border-2 shadow-sm ${
              inputData.credit_score >= 670
                ? 'text-emerald-900 bg-emerald-50 border-emerald-400'
                : 'text-rose-900 bg-rose-50 border-rose-400'
            }`}>
              {inputData.credit_score}
            </span>
          </div>

          <div className="relative w-full py-1">
            <input
              type="range"
              min="300"
              max="850"
              step="5"
              value={inputData.credit_score}
              onChange={(e) => handleChange('credit_score', e.target.value)}
              className="w-full h-4 rounded-full appearance-none cursor-pointer border-2 border-slate-700 shadow-inner"
              style={{
                background: `linear-gradient(to right, #0284c7 0%, #0284c7 ${((inputData.credit_score - 300) / (850 - 300)) * 100}%, #e2e8f0 ${((inputData.credit_score - 300) / (850 - 300)) * 100}%, #e2e8f0 100%)`
              }}
            />
          </div>
        </div>

        {/* Requested Loan Amount Slider */}
        <div className="flex flex-col gap-3 bg-white p-4 rounded-2xl border-2 border-pink-400 shadow-md">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="flex items-center gap-2 text-slate-950 font-black">
              <CreditCard className="w-5 h-5 text-pink-800 p-0.5 bg-pink-100 rounded-md border border-pink-300" />
              {t.loanAmountLabel}
            </span>
            <span className="font-mono text-pink-900 font-black text-base px-3 py-1 rounded-xl bg-pink-50 border-2 border-pink-400 shadow-sm">
              ₹{inputData.loan_amount.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="relative w-full py-1">
            <input
              type="range"
              min="50000"
              max="15000000"
              step="50000"
              value={inputData.loan_amount}
              onChange={(e) => handleChange('loan_amount', e.target.value)}
              className="w-full h-4 rounded-full appearance-none cursor-pointer border-2 border-slate-700 shadow-inner"
              style={{
                background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${((inputData.loan_amount - 50000) / (15000000 - 50000)) * 100}%, #e2e8f0 ${((inputData.loan_amount - 50000) / (15000000 - 50000)) * 100}%, #e2e8f0 100%)`
              }}
            />
          </div>
        </div>

        {/* Debt-to-Income Ratio Slider */}
        <div className="flex flex-col gap-3 bg-white p-4 rounded-2xl border-2 border-amber-400 shadow-md">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="flex items-center gap-2 text-slate-950 font-black">
              <Percent className="w-5 h-5 text-amber-800 p-0.5 bg-amber-100 rounded-md border border-amber-300" />
              {t.debtRatioLabel}
            </span>
            <span className="font-mono text-amber-900 font-black text-base px-3 py-1 rounded-xl bg-amber-50 border-2 border-amber-400 shadow-sm">
              {inputData.debt_ratio}%
            </span>
          </div>

          <div className="relative w-full py-1">
            <input
              type="range"
              min="5"
              max="75"
              step="1"
              value={inputData.debt_ratio}
              onChange={(e) => handleChange('debt_ratio', e.target.value)}
              className="w-full h-4 rounded-full appearance-none cursor-pointer border-2 border-slate-700 shadow-inner"
              style={{
                background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${((inputData.debt_ratio - 5) / (75 - 5)) * 100}%, #e2e8f0 ${((inputData.debt_ratio - 5) / (75 - 5)) * 100}%, #e2e8f0 100%)`
              }}
            />
          </div>
        </div>

        {/* Employment History Slider */}
        <div className="flex flex-col gap-3 md:col-span-2 bg-white p-4 rounded-2xl border-2 border-purple-400 shadow-md">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="flex items-center gap-2 text-slate-950 font-black">
              <Briefcase className="w-5 h-5 text-purple-800 p-0.5 bg-purple-100 rounded-md border border-purple-300" />
              {t.empYearsLabel}
            </span>
            <span className="font-mono text-purple-900 font-black text-base px-3 py-1 rounded-xl bg-purple-50 border-2 border-purple-400 shadow-sm">
              {inputData.employment_years} yrs
            </span>
          </div>

          <div className="relative w-full py-1">
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={inputData.employment_years}
              onChange={(e) => handleChange('employment_years', e.target.value)}
              className="w-full h-4 rounded-full appearance-none cursor-pointer border-2 border-slate-700 shadow-inner"
              style={{
                background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${((inputData.employment_years - 0) / (30 - 0)) * 100}%, #e2e8f0 ${((inputData.employment_years - 0) / (30 - 0)) * 100}%, #e2e8f0 100%)`
              }}
            />
          </div>
        </div>

      </div>

      {/* Action Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleSubmit}
        className="w-full py-4 rounded-2xl btn-saas-gradient text-white font-black text-lg shadow-2xl flex items-center justify-center gap-3 transition-all cursor-pointer"
      >
        <Zap className="w-6 h-6 fill-current text-yellow-300 animate-bounce" />
        <span>{t.evaluateBtn}</span>
      </motion.button>
    </motion.div>
  );
}
