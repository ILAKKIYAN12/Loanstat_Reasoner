export const en = {
  appTitle: "Trust the AI",
  subtitle: "Transparent Explainable AI (XAI) Loan Approval Engine with SHAP & LIME",
  
  // Navigation & Tabs
  step1Tab: "1. Applicant Profile",
  step2Tab: "2. Verdict",
  step3Tab: "3. XAI Reason",
  insightsTab: "Global Insights",
  kioskMode: "Auto Kiosk Mode Active",
  
  // Step 1 - Inputs
  presetTitle: "Quick Profile Presets (INR)",
  studentPreset: "🎓 Student",
  businessPreset: "💼 Business Owner",
  homeLoanPreset: "🏠 Home Loan",
  
  incomeLabel: "Annual Income (₹)",
  creditScoreLabel: "Credit Score",
  loanAmountLabel: "Requested Loan (₹)",
  debtRatioLabel: "Debt-to-Income Ratio (%)",
  empYearsLabel: "Employment History (Years)",
  
  evaluateBtn: "⚡ RUN 3D AI PREDICTION",
  
  // Step 2 - Verdict
  verdictApproved: "LOAN APPROVED",
  verdictRejected: "LOAN REJECTED",
  approvalProbLabel: "Approval Probability",
  hearWhyBtn: "🔊 Hear Why",
  viewExplanationBtn: "🔍 Explore 3D SHAP Reason",
  tryCounterfactualBtn: "🔄 Adjust Profile",
  
  // Step 3 - Reason
  shapTitle: "3D SHAP Feature Attribution Waterfall",
  shapSubtitle: "Shows how each factor shifted your baseline probability towards final verdict",
  limeTitle: "LIME Local Linear Surrogate Model",
  toggleView: "Explanation Model:",
  shapBtn: "SHAP (Exact Tree)",
  limeBtn: "LIME (Surrogate)",
  
  counterfactualTitle: "Counterfactual Scenario ('What-If')",
  counterfactualDesc: "See how changing key factors alters decision in real-time:",
  creditScoreCF: "What-if Credit Score:",
  
  // Global Insights
  globalTitle: "Population Risk & XAI Insights",
  topFactorsTitle: "Top 3 Decision Factors Across All Applicants",
  totalApplicants: "Total Applicants Analyzed",
  avgApproval: "Average Approval Rate",
  
  // General & Fallback
  offlineNotice: "Backend offline — using browser client-side ML engine fallback",
  clickForDetails: "Click any 3D bar to view human explanation"
};
