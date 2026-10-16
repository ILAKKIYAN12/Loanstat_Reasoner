import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

import Header from './components/Header';
import ThreeCanvas from './components/ThreeCanvas';
import Step1Input from './components/Step1Input';
import Step2Verdict from './components/Step2Verdict';
import Step3Reason from './components/Step3Reason';
import GlobalDashboard from './components/GlobalDashboard';
import UserProfile from './components/UserProfile';
import HelpSupport from './components/HelpSupport';
import LoginModal from './components/LoginModal';

import { en } from './locales/en';
import { ta } from './locales/ta';
import { fetchPrediction, fetchExplanation } from './utils/api';

const PRESETS = {
  student: {
    income: 240000,
    credit_score: 610,
    loan_amount: 150000,
    debt_ratio: 35,
    employment_years: 1
  },
  business: {
    income: 2400000,
    credit_score: 780,
    loan_amount: 3500000,
    debt_ratio: 18,
    employment_years: 9
  },
  homeLoan: {
    income: 1250000,
    credit_score: 720,
    loan_amount: 4500000,
    debt_ratio: 28,
    employment_years: 5
  }
};

export default function App() {
  const [lang, setLang] = useState('en');
  const t = lang === 'en' ? en : ta;

  // Theme State ('light' or 'dark')
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // User Authentication & Profile State
  const [user, setUser] = useState({ email: 'ilakkiyan@gmail.com', name: 'Ilakkiyan' });
  const [userProfile, setUserProfile] = useState({
    name: 'Ilakkiyan',
    email: 'ilakkiyan@gmail.com',
    age: '24',
    dob: '2002-05-15',
    gender: 'Male',
    isSaved: true
  });
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [activeStep, setActiveStep] = useState(1); // 1: Input, 2: Verdict, 3: Reason, 4: Insights, 5: Profile, 6: Help
  const [inputData, setInputData] = useState(PRESETS.homeLoan);
  
  const [verdict, setVerdict] = useState('Approved');
  const [probability, setProbability] = useState(0.78);
  const [explanationData, setExplanationData] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isOffline, setIsOffline] = useState(false);

  const handleApplyPreset = (key) => {
    if (PRESETS[key]) {
      setInputData(PRESETS[key]);
    }
  };

  const handleEvaluate = async () => {
    try {
      const predRes = await fetchPrediction(inputData);
      setVerdict(predRes.verdict);
      setProbability(predRes.probability);
      if (predRes.isOffline) setIsOffline(true);

      const expRes = await fetchExplanation(inputData);
      setExplanationData(expRes);
      if (expRes.shap_explanation && expRes.shap_explanation.length > 0) {
        setSelectedFeature(expRes.shap_explanation[0]);
      }

      setActiveStep(2);

      if (predRes.verdict === 'Approved') {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      console.error("Evaluation error:", err);
      setActiveStep(2);
    }
  };

  const handleCounterfactualChange = async (newCreditScore) => {
    const updated = { ...inputData, credit_score: newCreditScore };
    const predRes = await fetchPrediction(updated);
    setVerdict(predRes.verdict);
    setProbability(predRes.probability);

    const expRes = await fetchExplanation(updated);
    setExplanationData(expRes);

    if (predRes.verdict === 'Approved' && verdict !== 'Approved') {
      confetti({ particleCount: 110, spread: 85, origin: { y: 0.6 } });
    }
  };

  const handleGavelImpact = () => {
    confetti({
      particleCount: 75,
      spread: 75,
      origin: { y: 0.5 }
    });
  };

  return (
    <div className={`min-h-screen saas-bg-container bg-dot-pattern flex flex-col items-center pb-16 ${theme === 'dark' ? 'dark text-slate-100' : 'text-slate-900'}`}>
      
      {/* Gmail User Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(loggedInUser) => {
          setUser(loggedInUser);
          setUserProfile(prev => ({ ...prev, name: loggedInUser.name, email: loggedInUser.email }));
        }}
      />

      {/* Navigation Header */}
      <Header
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        t={t}
        isOffline={isOffline}
        user={user}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={() => setUser(null)}
      />

      {/* Focused Center-Aligned Main Content Container */}
      <main className="w-full max-w-6xl px-4 flex flex-col md:flex-row items-start justify-center gap-6 mt-2">
        
        {/* Left Column: 3D Interactive Canvas Scene */}
        {activeStep <= 3 && (
          <div className="w-full md:w-1/2 flex flex-col gap-3 mt-1">
            <ThreeCanvas
              step={activeStep}
              verdict={verdict}
              probability={probability}
              shapData={explanationData?.shap_explanation}
              onSelectFeature={setSelectedFeature}
              selectedFeature={selectedFeature}
              onGavelImpact={handleGavelImpact}
              inputData={inputData}
            />
            
            <div className="glass-card-saas p-3 rounded-2xl text-center text-xs font-bold shadow-md dark:text-slate-200 text-slate-800">
              💡 Drag with mouse to orbit 3D Risk Matrix | Scroll to zoom
            </div>
          </div>
        )}

        {/* Right Column / Full Width Step View Router */}
        <div className={`w-full ${activeStep <= 3 ? 'md:w-1/2' : 'w-full'} flex flex-col`}>
          {activeStep === 1 && (
            <Step1Input
              inputData={inputData}
              setInputData={setInputData}
              onApplyPreset={handleApplyPreset}
              onSubmit={handleEvaluate}
              t={t}
            />
          )}

          {activeStep === 2 && (
            <Step2Verdict
              verdict={verdict}
              probability={probability}
              explanationData={explanationData}
              onNextStep={() => setActiveStep(3)}
              onReset={() => setActiveStep(1)}
              t={t}
              lang={lang}
            />
          )}

          {activeStep === 3 && (
            <Step3Reason
              explanationData={explanationData}
              selectedFeature={selectedFeature}
              onSelectFeature={setSelectedFeature}
              inputData={inputData}
              setInputData={setInputData}
              onCounterfactualChange={handleCounterfactualChange}
              onBackToVerdict={() => setActiveStep(2)}
              t={t}
              lang={lang}
            />
          )}

          {activeStep === 4 && (
            <GlobalDashboard t={t} lang={lang} />
          )}

          {activeStep === 5 && (
            <UserProfile
              userProfile={userProfile}
              onSaveProfile={(updatedProfile) => {
                setUserProfile(updatedProfile);
                setUser({ email: updatedProfile.email, name: updatedProfile.name });
              }}
            />
          )}

          {activeStep === 6 && (
            <HelpSupport t={t} lang={lang} />
          )}
        </div>

      </main>
    </div>
  );
}
