
export class VoiceSynthesis {
  private synth: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    this.synth = window.speechSynthesis;
    this.loadVoices();
    
    // Load voices when they become available
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => {
        this.loadVoices();
      };
    }
  }

  private loadVoices() {
    this.voices = this.synth.getVoices();
  }

  private getVoiceForLanguage(language: 'en' | 'hi'): SpeechSynthesisVoice | null {
    // Try to find a voice for the specific language
    const langCode = language === 'hi' ? 'hi-IN' : 'en-US';
    let voice = this.voices.find(v => v.lang === langCode);
    
    // Fallback to any voice containing the language code
    if (!voice) {
      voice = this.voices.find(v => v.lang.startsWith(language));
    }
    
    // Fallback to default voice
    if (!voice && this.voices.length > 0) {
      voice = this.voices[0];
    }
    
    return voice || null;
  }

  speak(text: string, language: 'en' | 'hi' = 'en'): Promise<void> {
    return new Promise((resolve, reject) => {
      // Stop any ongoing speech
      this.stop();

      if (!this.synth) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      const voice = this.getVoiceForLanguage(language);
      
      if (voice) {
        utterance.voice = voice;
      }
      
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onend = () => {
        this.currentUtterance = null;
        resolve();
      };

      utterance.onerror = (event) => {
        this.currentUtterance = null;
        reject(new Error(`Speech synthesis error: ${event.error}`));
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    });
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  pause() {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
    }
  }

  resume() {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
    }
  }

  isSpeaking(): boolean {
    return this.synth ? this.synth.speaking : false;
  }

  isPaused(): boolean {
    return this.synth ? this.synth.paused : false;
  }
}

export const voiceSynthesis = new VoiceSynthesis();
