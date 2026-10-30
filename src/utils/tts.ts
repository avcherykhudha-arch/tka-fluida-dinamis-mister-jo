// SpeechSynthesis wrapper with Indonesian voice prioritization and event listeners

export interface TTSSettings {
  rate: number; // 0.8 - 1.4
  pitch: number; // 0.8 - 1.2
  volume: number; // 0 - 1
  autoSpeak: boolean;
}

export type TTSState = 'idle' | 'speaking' | 'paused';

class MisterJoSpeechEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private lastSpokenText: string = '';
  private state: TTSState = 'idle';
  private listeners: Set<(state: TTSState, text: string) => void> = new Set();
  private voices: SpeechSynthesisVoice[] = [];
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private settings: TTSSettings = {
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0,
    autoSpeak: true,
  };

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
      // Load saved settings
      try {
        const saved = localStorage.getItem('fisika_mister_jo_tts');
        if (saved) {
          this.settings = { ...this.settings, ...JSON.parse(saved) };
        }
      } catch {
        // ignore
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
    // Prioritize Indonesian voices: 'id-ID', 'id_ID', or names containing Indonesian
    const idVoices = this.voices.filter(
      (v) =>
        v.lang.toLowerCase().startsWith('id') ||
        v.name.toLowerCase().includes('indonesia') ||
        v.name.toLowerCase().includes('bahasa')
    );
    if (idVoices.length > 0) {
      // Pick the best natural voice if possible
      const preferred = idVoices.find(
        (v) =>
          v.name.includes('Google') ||
          v.name.includes('Natural') ||
          v.name.includes('Damayanti') ||
          v.name.includes('Andika')
      );
      this.selectedVoice = preferred || idVoices[0];
    } else if (this.voices.length > 0) {
      this.selectedVoice = this.voices[0];
    }
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  public getSelectedVoice(): SpeechSynthesisVoice | null {
    return this.selectedVoice;
  }

  public setVoice(voiceUri: string) {
    const found = this.voices.find((v) => v.voiceURI === voiceUri);
    if (found) {
      this.selectedVoice = found;
    }
  }

  public getSettings(): TTSSettings {
    return { ...this.settings };
  }

  public updateSettings(partial: Partial<TTSSettings>) {
    this.settings = { ...this.settings, ...partial };
    try {
      localStorage.setItem('fisika_mister_jo_tts', JSON.stringify(this.settings));
    } catch {
      // ignore
    }
  }

  public subscribe(listener: (state: TTSState, text: string) => void) {
    this.listeners.add(listener);
    listener(this.state, this.lastSpokenText);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.state, this.lastSpokenText));
  }

  public isSupported(): boolean {
    return this.synth !== null;
  }

  public getState(): TTSState {
    return this.state;
  }

  public getLastText(): string {
    return this.lastSpokenText;
  }

  /**
   * Speak text clearly as Mister Jo. Cleans math expressions into verbal descriptions.
   */
  public speak(rawText: string, force: boolean = true) {
    if (!this.synth) return;

    // Clean mathematical symbols into pronounceable Indonesian phrases
    const cleanText = this.sanitizeForTTS(rawText);
    if (!cleanText.trim()) return;

    // Stop ongoing speech
    this.stop();

    this.lastSpokenText = cleanText;
    const utterance = new SpeechSynthesisUtterance(cleanText);
    this.currentUtterance = utterance;

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    } else {
      utterance.lang = 'id-ID';
    }

    utterance.rate = this.settings.rate;
    utterance.pitch = this.settings.pitch;
    utterance.volume = this.settings.volume;

    utterance.onstart = () => {
      this.state = 'speaking';
      this.notify();
    };

    utterance.onend = () => {
      this.state = 'idle';
      this.currentUtterance = null;
      this.notify();
    };

    utterance.onerror = (e) => {
      // SpeechSynthesis error event
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        console.warn('SpeechSynthesis error:', e.error);
      }
      this.state = 'idle';
      this.currentUtterance = null;
      this.notify();
    };

    utterance.onpause = () => {
      this.state = 'paused';
      this.notify();
    };

    utterance.onresume = () => {
      this.state = 'speaking';
      this.notify();
    };

    this.synth.speak(utterance);
  }

  public pause() {
    if (!this.synth) return;
    if (this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
      this.state = 'paused';
      this.notify();
    }
  }

  public resume() {
    if (!this.synth) return;
    if (this.synth.paused) {
      this.synth.resume();
      this.state = 'speaking';
      this.notify();
    }
  }

  public replay() {
    if (this.lastSpokenText) {
      this.speak(this.lastSpokenText);
    }
  }

  public stop() {
    if (!this.synth) return;
    try {
      this.synth.cancel();
    } catch {
      // ignore
    }
    this.state = 'idle';
    this.currentUtterance = null;
    this.notify();
  }

  private sanitizeForTTS(text: string): string {
    let t = text;
    // Remove markdown symbols
    t = t.replace(/\*\*(.*?)\*\*/g, '$1');
    t = t.replace(/\*(.*?)\*/g, '$1');
    t = t.replace(/`([^`]+)`/g, '$1');
    t = t.replace(/###?\s*/g, '');

    // Translate common physics math notations into clean spoken words
    t = t.replace(/\\rho/g, ' rho ');
    t = t.replace(/\\Delta/g, ' delta ');
    t = t.replace(/\\times/g, ' kali ');
    t = t.replace(/\\cdot/g, ' kali ');
    t = t.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, ' $1 per $2 ');
    t = t.replace(/\\sqrt\{([^}]+)\}/g, ' akar dari $1 ');
    t = t.replace(/m\/s\^?2/g, ' meter per sekon kuadrat ');
    t = t.replace(/m\/s/g, ' meter per sekon ');
    t = t.replace(/m\^?3\/s/g, ' meter kubik per sekon ');
    t = t.replace(/m\^?2/g, ' meter persegi ');
    t = t.replace(/cm\^?2/g, ' sentimeter persegi ');
    t = t.replace(/kg\/m\^?3/g, ' kilogram per meter kubik ');
    t = t.replace(/g\/cm\^?3/g, ' gram per sentimeter kubik ');
    t = t.replace(/N\/m\^?2/g, ' newton per meter persegi ');
    t = t.replace(/(\w+)_1/g, ' $1 satu ');
    t = t.replace(/(\w+)_2/g, ' $1 dua ');
    t = t.replace(/v_1/g, ' v satu ');
    t = t.replace(/v_2/g, ' v dua ');
    t = t.replace(/A_1/g, ' A satu ');
    t = t.replace(/A_2/g, ' A dua ');
    t = t.replace(/P_1/g, ' P satu ');
    t = t.replace(/P_2/g, ' P dua ');
    t = t.replace(/h_1/g, ' h satu ');
    t = t.replace(/h_2/g, ' h dua ');
    t = t.replace(/½/g, ' setengah ');
    t = t.replace(/1\/2/g, ' setengah ');
    t = t.replace(/\$/g, '');

    // Remove double spaces
    t = t.replace(/\s+/g, ' ').trim();
    return t;
  }
}

export const misterJoTTS = new MisterJoSpeechEngine();
