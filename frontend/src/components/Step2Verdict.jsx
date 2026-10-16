import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Volume2, RotateCcw, Award, Download, ShieldCheck, ArrowRight, Eye } from 'lucide-react';
import { speakExplanation } from '../utils/tts';

export default function Step2Verdict({ verdict, probability, explanationData, onNextStep, onReset, t, lang }) {
  const isApproved = verdict === 'Approved';
  const probPercentage = Math.round(probability * 100);
  const [downloading, setDownloading] = useState(false);

  const riskLevel = probPercentage >= 70 ? 'LOW RISK' : probPercentage >= 45 ? 'MODERATE RISK' : 'HIGH RISK';
  const riskColor = probPercentage >= 70 
    ? 'text-emerald-800 bg-emerald-100 border-emerald-300 font-black' 
    : probPercentage >= 45 
    ? 'text-amber-800 bg-amber-100 border-amber-300 font-black' 
    : 'text-rose-800 bg-rose-100 border-rose-300 font-black';

  const shapList = explanationData?.shap_explanation || [];

  const handleSpeak = () => {
    if (!explanationData || !explanationData.shap_explanation) return;
    const topShap = explanationData.shap_explanation[0];
    const sentence = lang === 'ta' ? topShap.sentence_ta : topShap.sentence_en;
    const verdictText = isApproved ? t.verdictApproved : t.verdictRejected;
    
    speakExplanation(`${verdictText}. ${sentence}`, lang);
  };

  const handleDownloadCertificate = () => {
    setDownloading(true);
    const content = `=====================================================
⚡ EXPLAINABLE AI (XAI) LOAN DECISION CERTIFICATE
=====================================================
Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
Verdict: ${verdict.toUpperCase()}
Approval Probability: ${probPercentage}%
Risk Rating: ${riskLevel}

PRIMARY EXPLANATION FACTORS (SHAP VALUES):
-----------------------------------------------------
${shapList.map(f => `- ${f.label_en}: ${f.is_positive ? '+' : ''}${f.impact_percentage}% (${f.sentence_en})`).join('\n')}

=====================================================
Certified by Random Forest & SHAP TreeExplainer Engine
Verification Code: XAI-CERT-${Math.floor(100000 + Math.random() * 900000)}
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `XAI_Loan_Certificate_${verdict}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloading(false), 1000);
  };

  const handleNextWithScroll = () => {
    onNextStep();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col gap-6"
    >
      {/* Main Light Verdict Card */}
      <div className={`w-full glass-card-saas p-6 sm:p-8 rounded-3xl flex flex-col items-center text-center gap-5 border-3 transition-all duration-500 shadow-xl relative overflow-hidden ${
        isApproved
          ? 'border-emerald-500 glow-neon-green bg-gradient-to-b from-emerald-50 via-white to-slate-50'
          : 'border-rose-500 glow-neon-red bg-gradient-to-b from-rose-50 via-white to-slate-50 animate-shake'
      }`}>
        
        <div className="absolute top-4 right-4 opacity-15 pointer-events-none">
          <Award className="w-20 h-20 text-sky-600 animate-pulse" />
        </div>

        {/* Verdict Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
          className={`p-4 rounded-full shadow-lg ${
            isApproved
              ? 'bg-emerald-100 text-emerald-600 border-2 border-emerald-500 shadow-emerald-200'
              : 'bg-rose-100 text-rose-600 border-2 border-rose-500 shadow-rose-200'
          }`}
        >
          {isApproved ? (
            <CheckCircle2 className="w-14 h-14 stroke-[2.5]" />
          ) : (
            <XCircle className="w-14 h-14 stroke-[2.5]" />
          )}
        </motion.div>

        {/* Verdict Title */}
        <div className="z-10">
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${
            isApproved ? 'text-emerald-600' : 'text-rose-600'
          }`}>
            {isApproved ? t.verdictApproved : t.verdictRejected}
          </h2>
          
          <div className="mt-2.5 inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-300 shadow-inner">
            <span className="text-xs text-slate-800 font-bold">{t.approvalProbLabel}:</span>
            <span className={`font-mono text-xl font-black ${isApproved ? 'text-emerald-700' : 'text-rose-700'}`}>
              {probPercentage}%
            </span>
          </div>
        </div>

        {/* Assessed Risk Level Badge */}
        <div className="flex items-center gap-2 z-10">
          <ShieldCheck className="w-4.5 h-4.5 text-sky-600" />
          <span className={`text-xs font-black px-3.5 py-1 rounded-xl border ${riskColor}`}>
            ASSESSED RATING: {riskLevel}
          </span>
        </div>

        {/* Verification Stamp */}
        <div className="w-full flex justify-center py-1">
          <div className={`px-6 py-2 rounded-2xl border-2 font-mono font-black text-xs sm:text-sm uppercase tracking-widest rotate-[-2deg] shadow-md ${
            isApproved
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50'
              : 'border-rose-600 text-rose-700 bg-rose-50'
          }`}>
            {isApproved ? '✔ VERIFIED BY XAI ENGINE' : '✖ REJECTED BY RISK RULES'}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 w-full pt-2 z-10">
          
          {/* PRIMARY BUTTON: VIEW DETAILS */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextWithScroll}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl btn-saas-gradient text-white text-sm font-black shadow-xl transition active:scale-95 cursor-pointer"
          >
            <Eye className="w-5 h-5" />
            <span>🔍 VIEW FULL XAI REASONS</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          {/* Voice Explanation */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSpeak}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-300 text-xs font-black shadow-sm transition cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-sky-600 animate-pulse" />
            <span>{t.hearWhyBtn}</span>
          </motion.button>

          {/* Download AI Audit Certificate */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadCertificate}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-300 text-xs font-black shadow-sm transition cursor-pointer"
          >
            <Download className="w-4 h-4 text-purple-600" />
            <span>{downloading ? 'Downloading...' : '📥 Audit Certificate'}</span>
          </motion.button>

          {/* Try Counterfactual / Reset */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReset}
            className="flex items-center gap-2 text-slate-800 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 px-4 py-3 rounded-2xl border border-slate-300 text-xs font-black transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-sky-600" />
            <span>{t.tryCounterfactualBtn}</span>
          </motion.button>

        </div>

      </div>
    </motion.div>
  );
}
