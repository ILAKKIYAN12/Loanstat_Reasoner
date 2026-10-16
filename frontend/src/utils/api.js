import { calculateLocalPrediction, calculateLocalExplanation } from './fallbackMl';

const API_BASE_URL = 'http://localhost:8000';

export async function fetchPrediction(inputData) {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputData),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return { ...data, isOffline: false };
  } catch (err) {
    console.warn("FastAPI backend unreachable, using browser ML fallback:", err.message);
    const fallback = calculateLocalPrediction(inputData);
    return { ...fallback, isOffline: true };
  }
}

export async function fetchExplanation(inputData) {
  try {
    const response = await fetch(`${API_BASE_URL}/explain`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputData),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return { ...data, isOffline: false };
  } catch (err) {
    console.warn("FastAPI backend unreachable, using browser XAI fallback:", err.message);
    const fallback = calculateLocalExplanation(inputData);
    return { ...fallback, isOffline: true };
  }
}

export async function fetchGlobalInsights() {
  try {
    const response = await fetch(`${API_BASE_URL}/global-insights`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return { ...data, isOffline: false };
  } catch (err) {
    return {
      top_factors: [
        { feature: "credit_score", label_en: "Credit Score", label_ta: "கிரெடிட் ஸ்கோர்", importance: 38.5 },
        { feature: "income", label_en: "Annual Income", label_ta: "ஆண்டு வருமானம்", importance: 27.2 },
        { feature: "debt_ratio", label_en: "Debt Ratio", label_ta: "கடன் விகிதம்", importance: 18.3 }
      ],
      total_applicants_analyzed: 2500,
      avg_approval_rate: 64.2,
      isOffline: true
    };
  }
}
