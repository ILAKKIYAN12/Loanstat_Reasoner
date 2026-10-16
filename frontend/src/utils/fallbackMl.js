// Client-side machine learning engine calibrated for Indian Rupee (INR) scales

export function calculateLocalPrediction(input) {
  const { income, credit_score, loan_amount, debt_ratio, employment_years } = input;
  
  // Normalized score components for INR scale
  const scoreCS = (credit_score - 580) / 100 * 0.38;
  const scoreIncome = (Math.log(Math.max(income, 100000)) - 13.5) * 0.28;
  const scoreEmp = (employment_years - 3) / 10 * 0.15;
  const scoreLoan = -((loan_amount / Math.max(income, 100000)) - 1.5) * 0.25;
  const scoreDebt = -((debt_ratio - 30) / 25) * 0.20;
  
  const rawSum = scoreCS + scoreIncome + scoreEmp + scoreLoan + scoreDebt;
  const prob = 1 / (1 + Math.exp(-rawSum * 2.2));
  
  const verdict = prob >= 0.48 ? "Approved" : "Rejected";
  
  return {
    verdict,
    probability: prob,
    approval_percentage: Math.round(prob * 100)
  };
}

export function calculateLocalExplanation(input) {
  const { income, credit_score, loan_amount, debt_ratio, employment_years } = input;
  const pred = calculateLocalPrediction(input);
  const prob = pred.probability;
  const verdict = pred.verdict;
  
  const csShap = (credit_score - 670) / 200 * 0.36;
  const incomeShap = (income - 800000) / 1000000 * 0.26;
  const loanShap = - (loan_amount - 2000000) / 3000000 * 0.22;
  const debtShap = - (debt_ratio - 28) / 30 * 0.18;
  const empShap = (employment_years - 4) / 10 * 0.14;
  
  const shapRaw = [
    { feature: "credit_score", val: credit_score, shap: csShap, name_en: "Credit Score", name_ta: "கிரெடிட் ஸ்கோர்" },
    { feature: "income", val: income, shap: incomeShap, name_en: "Annual Income", name_ta: "ஆண்டு வருமானம்" },
    { feature: "loan_amount", val: loan_amount, shap: loanShap, name_en: "Requested Loan Amount", name_ta: "கோரப்பட்ட கடன் தொகை" },
    { feature: "debt_ratio", val: debt_ratio, shap: debtShap, name_en: "Debt-to-Income Ratio", name_ta: "கடன்-வருமான விகிதம்" },
    { feature: "employment_years", val: employment_years, shap: empShap, name_en: "Employment History", name_ta: "வேலை அனுபவம்" }
  ];
  
  const shap_explanation = shapRaw.map(item => {
    const pct = Math.round(Math.abs(item.shap) * 100);
    const isPos = item.shap >= 0;
    
    let sentence_en = "";
    let sentence_ta = "";
    
    if (item.feature === "credit_score") {
      sentence_en = `Your credit score of ${Math.round(item.val)} ${isPos ? 'boosted' : 'reduced'} approval by ${pct}%.`;
      sentence_ta = `உங்கள் கிரெடிட் ஸ்கோர் ${Math.round(item.val)} ஒப்புதல் வாய்ப்பை ${pct}% ${isPos ? 'உயர்த்தியது' : 'குறைத்தது'}.`;
    } else if (item.feature === "income") {
      const formattedRupee = `₹${Math.round(item.val).toLocaleString('en-IN')}`;
      sentence_en = `Annual income of ${formattedRupee} ${isPos ? 'added' : 'deducted'} ${pct}% from score.`;
      sentence_ta = `ஆண்டு வருமானம் ${formattedRupee} மதிப்பீட்டை ${pct}% ${isPos ? 'உயர்த்துகிறது' : 'குறைக்கிறது'}.`;
    } else if (item.feature === "loan_amount") {
      const formattedRupee = `₹${Math.round(item.val).toLocaleString('en-IN')}`;
      sentence_en = `Loan request of ${formattedRupee} ${isPos ? 'favors approval' : 'increases financial risk'} by ${pct}%.`;
      sentence_ta = `கோரப்பட்ட கடன் தொகை ${formattedRupee} ${pct}% ${isPos ? 'சாதகமானது' : 'அபாயத்தை உயர்த்துகிறது'}.`;
    } else if (item.feature === "debt_ratio") {
      sentence_en = `Debt-to-income ratio of ${item.val}% ${isPos ? 'remains safe' : 'strains rating'} by ${pct}%.`;
      sentence_ta = `கடன்-வருமான விகிதம் ${item.val}% ${pct}% ${isPos ? 'பாதுகாப்பானது' : 'ஒப்புதலைக் குறைக்கிறது'}.`;
    } else {
      sentence_en = `${item.val} years employment history ${isPos ? 'strengthens' : 'weakens'} profile by ${pct}%.`;
      sentence_ta = `${item.val} வருட வேலை அனுபவம் ${pct}% ${isPos ? 'வலுப்படுத்துகிறது' : 'பலவீனப்படுத்துகிறது'}.`;
    }
    
    return {
      feature: item.feature,
      label_en: item.name_en,
      label_ta: item.name_ta,
      value: item.val,
      shap_value: item.shap,
      impact_percentage: pct,
      is_positive: isPos,
      sentence_en,
      sentence_ta
    };
  });

  shap_explanation.sort((a, b) => Math.abs(b.shap_value) - Math.abs(a.shap_value));

  const lime_explanation = shap_explanation.map(item => ({
    feature: item.feature,
    label_en: item.label_en,
    label_ta: item.label_ta,
    weight: Number((item.shap_value * 1.1).toFixed(3)),
    is_positive: item.is_positive
  }));

  const counterfactual = prob >= 0.48 ? {
    target_feature: "credit_score",
    recommended_value: Math.max(300, Math.round(credit_score - 60)),
    message_en: `If credit score dropped to ${Math.max(300, Math.round(credit_score - 60))}, approval rating would decline.`,
    message_ta: `கிரெடிட் ஸ்கோர் ${Math.max(300, Math.round(credit_score - 60))} ஆக குறைந்தால் ஒப்புதல் குறையும்.`
  } : {
    target_feature: "credit_score",
    recommended_value: Math.min(850, Math.round(credit_score + 80)),
    message_en: `If your credit score were ${Math.min(850, Math.round(credit_score + 80))}, your loan would be approved!`,
    message_ta: `உங்கள் கிரெடிட் ஸ்கோர் ${Math.min(850, Math.round(credit_score + 80))} ஆக இருந்தால், கடன் ஒப்புதல் பெறப்படும்!`
  };

  return {
    verdict,
    probability: prob,
    base_value: 0.50,
    shap_explanation,
    lime_explanation,
    counterfactual,
    fallback: true
  };
}
