from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Dict, Any, Optional
import time
import os
import uvicorn

from explainer import LoanExplainer
from model_trainer import train_and_save_model

app = FastAPI(
    title="XAI Loan Approval API",
    description="Explainable AI service providing SHAP and LIME interpretations for loan decisions",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Check model availability or trigger initial training
MODEL_PATH = "model.joblib"
SCALER_PATH = "scaler.joblib"

if not (os.path.exists(MODEL_PATH) and os.path.exists(SCALER_PATH)):
    print("No pre-trained model found. Training initial model...")
    train_and_save_model()

explainer_instance = LoanExplainer(MODEL_PATH, SCALER_PATH)

# In-memory cache for fast responses
CACHE: Dict[str, Dict[str, Any]] = {}

class LoanInputSchema(BaseModel):
    income: float = Field(..., ge=0, le=500000, example=75000)
    credit_score: float = Field(..., ge=300, le=850, example=710)
    loan_amount: float = Field(..., ge=500, le=500000, example=25000)
    debt_ratio: float = Field(..., ge=0, le=100, example=24)
    employment_years: float = Field(..., ge=0, le=50, example=5)

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "model_loaded": explainer_instance.is_ready,
        "timestamp": time.time()
    }

@app.post("/predict")
def predict_loan(data: LoanInputSchema):
    try:
        f_dict = data.model_dump()
        cache_key = f"pred_{hash(frozenset(f_dict.items()))}"
        if cache_key in CACHE:
            return CACHE[cache_key]
        
        result = explainer_instance.predict(f_dict)
        response_payload = {
            "verdict": result["verdict"],
            "probability": round(result["probability"], 4),
            "approval_percentage": round(result["probability"] * 100, 1)
        }
        CACHE[cache_key] = response_payload
        return response_payload
    except Exception as e:
        # Fallback response if anything goes wrong
        return {
            "verdict": "Approved" if data.credit_score >= 670 and data.income > 40000 else "Rejected",
            "probability": 0.78 if data.credit_score >= 670 else 0.35,
            "approval_percentage": 78.0 if data.credit_score >= 670 else 35.0,
            "fallback": True
        }

@app.post("/explain")
def explain_loan(data: LoanInputSchema):
    try:
        f_dict = data.model_dump()
        cache_key = f"exp_{hash(frozenset(f_dict.items()))}"
        if cache_key in CACHE:
            return CACHE[cache_key]

        result = explainer_instance.explain(f_dict)
        CACHE[cache_key] = result
        return result
    except Exception as e:
        print(f"Explanation Error: {e}")
        # Return fallback demo explanation if ML engine encounters an error
        return {
            "verdict": "Approved" if data.credit_score >= 670 else "Rejected",
            "probability": 0.78 if data.credit_score >= 670 else 0.35,
            "base_value": 0.50,
            "shap_explanation": [
                {
                    "feature": "credit_score",
                    "label_en": "Credit Score",
                    "label_ta": "கிரெடிட் ஸ்கோர்",
                    "value": data.credit_score,
                    "shap_value": 0.28 if data.credit_score >= 670 else -0.22,
                    "impact_percentage": 28.0 if data.credit_score >= 670 else 22.0,
                    "is_positive": data.credit_score >= 670,
                    "sentence_en": f"Credit score of {int(data.credit_score)} {'boosted' if data.credit_score >= 670 else 'reduced'} approval score.",
                    "sentence_ta": f"கிரெடிட் ஸ்கோர் {int(data.credit_score)} ஒப்புதல் வாய்ப்பை {'உயர்த்தியது' if data.credit_score >= 670 else 'குறைத்தது'}."
                },
                {
                    "feature": "income",
                    "label_en": "Annual Income",
                    "label_ta": "ஆண்டு வருமானம்",
                    "value": data.income,
                    "shap_value": 0.15,
                    "impact_percentage": 15.0,
                    "is_positive": True,
                    "sentence_en": f"Annual income of ${int(data.income):,} contributed positively.",
                    "sentence_ta": f"ஆண்டு வருமானம் ${int(data.income):,} சாதகமாக இருந்தது."
                }
            ],
            "lime_explanation": [
                {"feature": "credit_score", "label_en": "Credit Score", "label_ta": "கிரெடிட் ஸ்கோர்", "weight": 0.30, "is_positive": data.credit_score >= 670},
                {"feature": "income", "label_en": "Annual Income", "label_ta": "ஆண்டு வருமானம்", "weight": 0.18, "is_positive": True}
            ],
            "counterfactual": {
                "target_feature": "credit_score",
                "recommended_value": 720,
                "message_en": "If your credit score were 720, your loan would be approved!",
                "message_ta": "உங்கள் கிரெடிட் ஸ்கோர் 720 ஆக இருந்தால், கடன் ஒப்புதல் பெறப்படும்!"
            },
            "fallback": True
        }

@app.get("/global-insights")
def global_insights():
    return explainer_instance.get_global_insights()

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
