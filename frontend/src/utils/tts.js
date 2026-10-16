// Web Speech API Text-to-Speech Engine for English & Tamil

export function speakExplanation(text, lang = 'en') {
  if (!('speechSynthesis' in window)) {
    alert("Speech Synthesis is not supported in this browser.");
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1.0;
  
  // Select matching voice if available
  const voices = window.speechSynthesis.getVoices();
  const targetLangPrefix = lang === 'ta' ? 'ta' : 'en';
  
  const matchedVoice = voices.find(v => v.lang.toLowerCase().startsWith(targetLangPrefix));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }
  utterance.lang = lang === 'ta' ? 'ta-IN' : 'en-US';

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
