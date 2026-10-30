import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, Square, Mic, Settings, Check } from 'lucide-react';
import { misterJoTTS, TTSSettings } from '../utils/tts';

export const TTSConfigView: React.FC = () => {
  const [settings, setSettings] = useState<TTSSettings>(misterJoTTS.getSettings());
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>(misterJoTTS.getAvailableVoices());
  const [selectedVoice, setSelectedVoice] = useState<string>(
    misterJoTTS.getSelectedVoice()?.voiceURI || ''
  );
  const [testSampleText, setTestSampleText] = useState<string>(
    'Halo! Saya Mister Jo, guru pembimbing Fisika TKA Anda. Mari kita kuasai konsep Fluida Dinamis bersama-sama!'
  );

  useEffect(() => {
    const updateVoiceList = () => {
      const v = misterJoTTS.getAvailableVoices();
      setVoices(v);
      const curr = misterJoTTS.getSelectedVoice();
      if (curr) setSelectedVoice(curr.voiceURI);
    };

    updateVoiceList();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoiceList;
    }
  }, []);

  const handleRateChange = (rate: number) => {
    misterJoTTS.updateSettings({ rate });
    setSettings(misterJoTTS.getSettings());
  };

  const handlePitchChange = (pitch: number) => {
    misterJoTTS.updateSettings({ pitch });
    setSettings(misterJoTTS.getSettings());
  };

  const handleVolumeChange = (volume: number) => {
    misterJoTTS.updateSettings({ volume });
    setSettings(misterJoTTS.getSettings());
  };

  const handleSelectVoice = (voiceURI: string) => {
    setSelectedVoice(voiceURI);
    misterJoTTS.setVoice(voiceURI);
  };

  const handleTestSpeech = () => {
    misterJoTTS.speak(testSampleText);
  };

  const handleStopSpeech = () => {
    misterJoTTS.stop();
  };

  const isTTSAvailable = misterJoTTS.isSupported();

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-rose-900 text-amber-300 flex items-center justify-center font-bold text-xl shadow-md">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-rose-950">
              Pengaturan Suara Narator Mister Jo
            </h2>
            <p className="text-slate-600 text-sm">
              Kustomisasi parameter Web Speech API Bahasa Indonesia untuk pendampingan belajar optimal
            </p>
          </div>
        </div>

        {/* TTS Support Status Card */}
        <div
          className={`p-4 rounded-2xl border flex items-center gap-3 ${
            isTTSAvailable
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-amber-50 border-amber-200 text-amber-950'
          }`}
        >
          <Volume2 className="w-6 h-6 text-emerald-700 shrink-0" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold">Status Fitur Audio:</span>{' '}
            {isTTSAvailable
              ? 'Web Speech API didukung oleh browser Anda. Suara Bahasa Indonesia aktif otomatis saat Anda berinteraksi dengan soal.'
              : 'Web Speech API belum didukung penuh oleh browser Anda. Teks narasi tetap dapat Anda baca secara lengkap pada setiap panel.'}
          </div>
        </div>

        {/* Sliders Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Rate / Speed */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
              <span>Kecepatan Bicara</span>
              <span className="text-rose-900 font-extrabold">{settings.rate}x</span>
            </div>
            <input
              type="range"
              min="0.7"
              max="1.4"
              step="0.05"
              value={settings.rate}
              onChange={(e) => handleRateChange(parseFloat(e.target.value))}
              className="w-full accent-rose-900 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0.7x (Lambat)</span>
              <span>1.0x (Normal)</span>
              <span>1.4x (Cepat)</span>
            </div>
          </div>

          {/* Pitch */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
              <span>Nada Suara (Pitch)</span>
              <span className="text-rose-900 font-extrabold">{settings.pitch}</span>
            </div>
            <input
              type="range"
              min="0.8"
              max="1.2"
              step="0.05"
              value={settings.pitch}
              onChange={(e) => handlePitchChange(parseFloat(e.target.value))}
              className="w-full accent-rose-900 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Rendah (Berat)</span>
              <span>1.0 (Alami)</span>
              <span>Tinggi</span>
            </div>
          </div>

          {/* Volume */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
              <span>Tingkat Volume</span>
              <span className="text-rose-900 font-extrabold">{Math.round(settings.volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={settings.volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-full accent-rose-900 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>10%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Voice Selection Dropdown if multiple voices are available */}
        {voices.length > 0 && (
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Pilihan Profil Suara Sistem:
            </label>
            <select
              value={selectedVoice}
              onChange={(e) => handleSelectVoice(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-rose-800"
            >
              {voices.map((v) => (
                <option key={v.voiceURI} value={v.voiceURI}>
                  {v.name} ({v.lang}) {v.lang.startsWith('id') ? '⭐ [Bahasa Indonesia]' : ''}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 italic">
              *Aplikasi memprioritaskan profil bahasa Indonesia (id-ID) dengan artikulasi natural.
            </p>
          </div>
        )}

        {/* Test Speech Sample */}
        <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-rose-950">
            Uji Suara Mister Jo:
          </label>
          <textarea
            value={testSampleText}
            onChange={(e) => setTestSampleText(e.target.value)}
            rows={2}
            className="w-full p-3 rounded-xl border border-rose-200 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-rose-800 resize-none"
          />

          <div className="flex items-center gap-3">
            <button
              onClick={handleTestSpeech}
              className="flex items-center gap-2 px-5 py-2.5 bg-rose-900 hover:bg-rose-850 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition"
            >
              <Play className="w-4 h-4 fill-current text-amber-300" />
              <span>Putar Contoh Suara</span>
            </button>
            <button
              onClick={handleStopSpeech}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs sm:text-sm rounded-xl transition"
            >
              <Square className="w-4 h-4" />
              <span>Hentikan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
