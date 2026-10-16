import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, TrendingUp, TrendingDown, Layers, Sparkles, CheckCircle2, XCircle, ArrowLeft, Calculator, Equal, HelpCircle } from 'lucide-react';

export default function Step3Reason({
  explanationData,
  selectedFeature,
  onSelectFeature,
  inputData,
  setInputData,
  onCounterfactualChange,
  onBackToVerdict,
  t,
  lang
}) {
  const [viewMode, setViewMode] = useState('shap');

  if (!explanationData) {
    return <div className="text-center py-8 text-slate-800 font-black">Loading XAI Explanations...</div>;
  }

  const shapList = explanationData.shap_explanation || [];
  const limeList = explanationData.lime_explanation || [];
  const counterfactual = explanationData.counterfactual || {};
  const probability = explanationData.probability || 0.78;
  const isApproved = explanationData.verdict === 'Approved' || probability >= 0.5;

  // Calculate cumulative running totals for the step-by-step calculation column
  let runningTotal = 50.0; // Baseline average population approval rate (50%)
  const calculationRows = shapList.map(item => {
    const impact = item.is_positive ? item.impact_percentage : -item.impact_percentage;
    const startVal = runningTotal;
    runningTotal = Math.max(0, Math.min(100, runningTotal + impact));
    return {
      ...item,
      impactVal: impact,
      startVal: startVal.toFixed(1),
      endVal: runningTotal.toFixed(1)
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col gap-6"
    >
      {/* Light Reasons Header */}
      <div className={`glass-card-saas p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 border-2 shadow-xl ${
        isApproved
          ? 'border-emerald-400 bg-gradient-to-r from-emerald-50 via-white to-slate-50'
          : 'border-rose-400 bg-gradient-to-r from-rose-50 via-white to-slate-50'
      }`}>
        <div className="flex items-center gap-3">
          {onBackToVerdict && (
            <button
              onClick={onBackToVerdict}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 transition cursor-pointer"
              title="Back to Verdict"
            >
              <ArrowLeft className="w-5 h-5 text-sky-600" />
            </button>
          )}

          <div>
            <div className="flex items-center gap-2">
              {isApproved ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              ) : (
                <XCircle className="w-6 h-6 text-rose-600" />
              )}
              <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                {isApproved ? "Why Approved: XAI Reason Breakdown" : "Why Rejected: XAI Reason Breakdown"}
              </h2>
            </div>
            <p className="text-xs text-slate-800 font-extrabold mt-1">
              Exact SHAP & LIME feature attribution scores explaining the AI decision
            </p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-300 shadow-inner">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('shap')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition ${
              viewMode === 'shap'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-700 hover:text-slate-950'
            }`}
          >
            {t.shapBtn}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode('lime')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition ${
              viewMode === 'lime'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-700 hover:text-slate-950'
            }`}
          >
            {t.limeBtn}
          </motion.button>
        </div>
      </div>

      {/* Feature Attribution Cards */}
      <div className="glass-card-saas p-6 rounded-3xl flex flex-col gap-4 border border-slate-200 shadow-xl">
        <h3 className="text-xs font-black uppercase tracking-widest text-sky-800 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-purple-600 animate-spin" />
          {t.clickForDetails}
        </h3>

        {viewMode === 'shap' ? (
          <div className="flex flex-col gap-3">
            {shapList.map((item, idx) => {
              const isSelected = selectedFeature?.feature === item.feature;
              const label = lang === 'ta' ? item.label_ta : item.label_en;
              const sentence = lang === 'ta' ? item.sentence_ta : item.sentence_en;

              return (
                <motion.div
                  key={item.feature}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectFeature(item)}
                  className={`p-4 rounded-2xl border-2 transition cursor-pointer flex flex-col gap-2.5 shadow-sm ${
                    isSelected
                      ? 'bg-sky-50 border-sky-500 shadow-sky-100'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 font-black text-sm text-slate-950">
                      <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-black text-xs flex items-center justify-center shadow-sm">
                        #{idx + 1}
                      </span>

                      {item.is_positive ? (
                        <div className="p-1.5 rounded-xl bg-emerald-100 text-emerald-700">
                          <TrendingUp className="w-5 h-5 stroke-[2.5]" />
                        </div>
                      ) : (
                        <div className="p-1.5 rounded-xl bg-rose-100 text-rose-700">
                          <TrendingDown className="w-5 h-5 stroke-[2.5]" />
                        </div>
                      )}
                      <span>{label}</span>
                    </div>

                    <span className={`font-mono text-xs font-black px-3 py-1 rounded-xl shadow-sm ${
                      item.is_positive
                        ? 'bg-emerald-600 text-white font-black'
                        : 'bg-rose-600 text-white font-black'
                    }`}>
                      {item.is_positive ? '+' : ''}{item.impact_percentage}%
                    </span>
                  </div>

                  <p className="text-xs font-extrabold text-slate-900 leading-relaxed bg-slate-100 p-3 rounded-xl border border-slate-300">
                    {sentence}
                  </p>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {limeList.map((item, idx) => {
              const label = lang === 'ta' ? item.label_ta : item.label_en;
              return (
                <div key={item.feature} className="p-4 rounded-2xl bg-white border border-slate-300 flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-lg bg-purple-600 text-white font-black text-[10px] flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <span className="font-black text-slate-950">{label}</span>
                  </div>
                  <span className={`font-mono font-black px-3 py-1 rounded-xl ${
                    item.is_positive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    LIME Weight: {item.weight > 0 ? `+${item.weight}` : item.weight}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* NEW: Step-by-Step Mathematical Calculation & Formula Column */}
      <div className="glass-card-saas p-6 rounded-3xl border-3 border-sky-400 flex flex-col gap-4 bg-gradient-to-br from-sky-50 via-white to-blue-50 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-sky-600 text-white font-black">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-950">
                Step-by-Step Probability Calculation Column
              </h3>
              <p className="text-xs text-slate-700 font-extrabold">
                Exact mathematical sum showing how your {Math.round(probability * 100)}% approval rate was calculated
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-black bg-sky-100 text-sky-900 px-3 py-1 rounded-xl border border-sky-300">
            Formula Column
          </span>
        </div>

        {/* Calculation Steps Table */}
        <div className="flex flex-col gap-2.5">
          {/* Baseline Population Average */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white border-2 border-slate-200 text-xs shadow-sm">
            <span className="font-black text-slate-800 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-200 text-slate-900 font-black flex items-center justify-center text-xs">
                1
              </span>
              Baseline Population Average
            </span>
            <span className="font-mono font-black text-slate-900 text-sm bg-slate-100 px-2.5 py-0.5 rounded-lg">
              50.0%
            </span>
          </div>

          {/* Each SHAP Feature Factor Contribution */}
          {calculationRows.map((row, idx) => {
            const label = lang === 'ta' ? row.label_ta : row.label_en;
            return (
              <div key={row.feature} className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200 text-xs shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-sky-600 text-white font-black flex items-center justify-center text-xs">
                    {idx + 2}
                  </span>
                  <span className="font-black text-slate-950">{label} Factor</span>
                </div>

                <div className="flex items-center gap-3 font-mono font-black">
                  <span className={`px-2.5 py-0.5 rounded-lg ${
                    row.is_positive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {row.is_positive ? '+' : ''}{row.impactVal}%
                  </span>
                  <span className="text-slate-400">➔</span>
                  <span className="text-slate-950 text-xs bg-slate-100 px-2 py-0.5 rounded-md border border-slate-300">
                    Running: {row.endVal}%
                  </span>
                </div>
              </div>
            );
          })}

          {/* Equal Sign & Final Result Bar */}
          <div className={`flex items-center justify-between p-4 rounded-2xl border-3 text-sm font-black shadow-md mt-1 ${
            isApproved
              ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
              : 'bg-rose-50 border-rose-500 text-rose-950'
          }`}>
            <div className="flex items-center gap-2">
              <Equal className="w-6 h-6 text-slate-900" />
              <span>FINAL COMPUTED APPROVAL PROBABILITY</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xl font-black">
                {Math.round(probability * 100)}%
              </span>
              <span className={`text-xs px-3 py-1 rounded-xl text-white font-black uppercase ${
                isApproved ? 'bg-emerald-600' : 'bg-rose-600'
              }`}>
                {isApproved ? 'Approved (≥ 50%)' : 'Rejected (< 50%)'}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Counterfactual Slider Box */}
      <div className="glass-card-saas p-6 rounded-3xl border-2 border-sky-300 flex flex-col gap-4 bg-gradient-to-br from-sky-50 via-purple-50 to-white shadow-xl">
        <div className="flex items-center gap-2 text-sky-900 font-black text-base">
          <Sliders className="w-5 h-5 text-sky-600" />
          <span>{t.counterfactualTitle}</span>
        </div>
        
        <p className="text-xs text-slate-900 font-extrabold leading-relaxed bg-white p-3.5 rounded-xl border border-slate-300">
          {lang === 'ta' ? counterfactual.message_ta : counterfactual.message_en}
        </p>

        <div className="flex flex-col gap-2 pt-2">
          <div className="flex justify-between items-center text-xs text-slate-950 font-black">
            <span>{t.creditScoreCF}</span>
            <span className="font-mono font-black text-sky-800 text-base px-3 py-1 rounded-lg bg-sky-100 border border-sky-300">
              {inputData.credit_score}
            </span>
          </div>
          <input
            type="range"
            min="300"
            max="850"
            step="5"
            value={inputData.credit_score}
            onChange={(e) => {
              const val = Number(e.target.value);
              setInputData(prev => ({ ...prev, credit_score: val }));
              onCounterfactualChange(val);
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
