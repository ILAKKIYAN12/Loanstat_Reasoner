import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, roc_auc_score
import joblib
import os

FEATURE_NAMES = ["income", "credit_score", "loan_amount", "debt_ratio", "employment_years"]

def generate_synthetic_loan_data(n_samples=2500, random_state=42):
    np.random.seed(random_state)
    
    # Feature distributions based on realistic loan application profiles
    income = np.random.lognormal(mean=10.8, sigma=0.6, size=n_samples) # ~$20k - $180k
    income = np.clip(income, 15000, 250000)
    
    credit_score = np.random.normal(loc=670, scale=85, size=n_samples)
    credit_score = np.clip(credit_score, 300, 850)
    
    loan_amount = np.random.lognormal(mean=10.2, sigma=0.7, size=n_samples) # ~$5k - $120k
    loan_amount = np.clip(loan_amount, 2000, 150000)
    
    debt_ratio = np.random.beta(a=2, b=5, size=n_samples) * 100 # 5% - 70%
    debt_ratio = np.clip(debt_ratio, 5, 80)
    
    employment_years = np.random.exponential(scale=4, size=n_samples)
    employment_years = np.clip(employment_years, 0, 35)
    
    df = pd.DataFrame({
        'income': income,
        'credit_score': credit_score,
        'loan_amount': loan_amount,
        'debt_ratio': debt_ratio,
        'employment_years': employment_years
    })
    
    # Realistic approval score logic
    # Higher credit score, income, employment = positive
    # Higher loan amount, debt ratio = negative
    score = (
        (df['credit_score'] - 580) / 100 * 2.2 +
        (np.log(df['income']) - 10.5) * 1.8 +
        (df['employment_years']) * 0.25 -
        (df['loan_amount'] / df['income']) * 3.5 -
        (df['debt_ratio'] - 30) / 15 * 1.5
    )
    
    # Probability conversion via sigmoid
    prob = 1 / (1 + np.exp(-score))
    approved = (prob > 0.48).astype(int)
    
    df['target'] = approved
    return df

def train_and_save_model(output_dir="."):
    print("Generating synthetic loan application dataset...")
    df = generate_synthetic_loan_data()
    
    X = df[FEATURE_NAMES]
    y = df['target']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    print("Training Random Forest Classifier...")
    model = RandomForestClassifier(
        n_estimators=120,
        max_depth=8,
        min_samples_split=6,
        random_state=42,
        n_jobs=-1
    )
    model.fit(X_train_scaled, y_train)
    
    y_pred_prob = model.predict_proba(X_test_scaled)[:, 1]
    y_pred = (y_pred_prob >= 0.5).astype(int)
    
    auc = roc_auc_score(y_test, y_pred_prob)
    print(f"Model Training Complete! ROC-AUC: {auc:.4f}")
    print(classification_report(y_test, y_pred))
    
    os.makedirs(output_dir, exist_ok=True)
    model_path = os.path.join(output_dir, "model.joblib")
    scaler_path = os.path.join(output_dir, "scaler.joblib")
    data_sample_path = os.path.join(output_dir, "background_data.joblib")
    
    joblib.dump(model, model_path)
    joblib.dump(scaler, scaler_path)
    joblib.dump(X_train_scaled[:200], data_sample_path) # Background sample for LIME/SHAP
    
    print(f"Artifacts saved to {model_path}, {scaler_path}, and {data_sample_path}")

if __name__ == "__main__":
    train_and_save_model()
