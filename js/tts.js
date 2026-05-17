// Text-to-Speech using Web Speech API (American English)

let speaking = false;

function speak(text, rate = 0.9) {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();
  speaking = false;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = rate;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  // Try to use a good American English voice
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(v =>
    v.lang === 'en-US' && (v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Karen'))
  ) || voices.find(v => v.lang === 'en-US') || voices[0];

  if (preferredVoice) utterance.voice = preferredVoice;

  utterance.onstart = () => { speaking = true; };
  utterance.onend = () => { speaking = false; };
  utterance.onerror = () => { speaking = false; };

  window.speechSynthesis.speak(utterance);
}

function speakWord(word) {
  speak(word, 0.85);
}

function speakSentence(sentence) {
  speak(sentence, 0.8);
}

function stopSpeaking() {
  window.speechSynthesis.cancel();
  speaking = false;
}

function isSpeaking() {
  return speaking;
}

// Ensure voices are loaded
if ('speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.getVoices(); };
}
