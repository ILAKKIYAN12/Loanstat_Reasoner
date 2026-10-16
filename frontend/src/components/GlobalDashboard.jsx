import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, CheckCircle, ShieldCheck } from 'lucide-react';
import { fetchGlobalInsights } from '../utils/api';

export default function GlobalDashboard({ t, lang }) {
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    fetchGlobalInsights().then(res => setInsights(res));
  }, []);

  if (!insights) {
    return <div className="text-center py-8 text-slate-300 font-bold">Loading Population Insights...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col gap-6"
    >
      {/* Top Banner Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass-card-saas p-6 rounded-3xl flex items-center gap-4 border border-white/10 shadow-xl">
          <div className="p-3.5 rounded-2xl bg-indigo-500/20 text-indigo-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">{t.totalApplicants}</p>
            <p className="text-2xl font-black font-mono text-white mt-0.5">
              {insights.total_applicants_analyzed.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="glass-card-saas p-6 rounded-3xl flex items-center gap-4 border border-white/10 shadow-xl">
          <div className="p-3.5 rounded-2xl bg-[#00ff88]/20 text-[#00ff88]">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">{t.avgApproval}</p>
            <p className="text-2xl font-black font-mono text-[#00ff88] mt-0.5">
              {insights.avg_approval_rate}%
            </p>
          </div>
        </div>
      </div>

      {/* Top 3 Risk Factors Card */}
      <div className="glass-card-saas p-6 sm:p-8 rounded-3xl flex flex-col gap-6 border border-white/10 shadow-2xl">
        <h3 className="text-lg font-black text-white flex items-center gap-2.5">
          <BarChart3 className="w-5 h-5 text-indigo-400" />
          <span>{t.topFactorsTitle}</span>
        </h3>

        <div className="flex flex-col gap-5">
          {insights.top_factors.map((factor, idx) => {
            const label = lang === 'ta' ? factor.label_ta : factor.label_en;
            return (
              <div key={factor.feature} className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                  <span className="text-slate-200 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-indigo-400" />
                    #{idx + 1} {label}
                  </span>
                  <span className="font-mono text-indigo-300 font-black">
                    {factor.importance}% Importance
                  </span>
                </div>
                <div className="w-full h-3.5 bg-slate-950 rounded-full overflow-hidden border border-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${factor.importance}%` }}
                    transition={{ duration: 1, delay: idx * 0.2 }}
                    className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-[#00ff88] rounded-full shadow-lg"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
