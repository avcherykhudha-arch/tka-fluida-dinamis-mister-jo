import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, Square, Mic, Sparkles } from 'lucide-react';
import { misterJoTTS, TTSState, TTSSettings } from '../utils/tts';

interface MisterJoNarratorProps {
  currentText?: string;
  contextLabel?: string;
  className?: string;
  compact?: boolean;
}

export const MisterJoNarrator: React.FC<MisterJoNarratorProps> = ({
  currentText,
  contextLabel = 'Panduan Mister Jo',
  className = '',
  compact = false,
}) => {
  const [state, setState] = useState<TTSState>(misterJoTTS.getState());
  const [activeText, setActiveText] = useState<string>(misterJoTTS.getLastText());
  const [settings, setSettings] = useState<TTSSettings>(misterJoTTS.getSettings());

  useEffect(() => {
    const unsubscribe = misterJoTTS.subscribe((newState, text) => {
      setState(newState);
      setActiveText(text);
    });
    return () => unsubscribe();
  }, []);

  const handlePlay = (textToPlay?: string) => {
    const text = textToPlay || currentText || activeText;
    if (text) {
      misterJoTTS.speak(text);
    }
  };

  const handlePause = () => {
    misterJoTTS.pause();
  };

  const handleResume = () => {
    misterJoTTS.resume();
  };

  const handleReplay = () => {
    if (currentText) {
      misterJoTTS.speak(currentText);
    } else {
      misterJoTTS.replay();
    }
  };

  const handleStop = () => {
    misterJoTTS.stop();
  };

  const cycleRate = () => {
    const rates = [0.85, 1.0, 1.15, 1.3];
    const currentIndex = rates.findIndex((r) => Math.abs(r - settings.rate) < 0.05);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    misterJoTTS.updateSettings({ rate: nextRate });
    setSettings(misterJoTTS.getSettings());
  };

  const isSpeaking = state === 'speaking';
  const isPaused = state === 'paused';

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-2 bg-rose-50 border border-rose-200 rounded-full px-3 py-1.5 ${className}`}>
        <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-rose-900 text-amber-300 font-bold text-xs">
          <span>Jo</span>
          {isSpeaking && (
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
          )}
        </div>

        {isSpeaking ? (
          <button
            onClick={handlePause}
            aria-label="Jeda narasi"
            className="p-1 text-rose-800 hover:text-rose-950 hover:bg-rose-100 rounded-full transition-colors"
            title="Jeda"
          >
            <Pause className="w-3.5 h-3.5" />
          </button>
        ) : isPaused ? (
          <button
            onClick={handleResume}
            aria-label="Lanjutkan narasi"
            className="p-1 text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 rounded-full transition-colors"
            title="Lanjutkan"
          >
            <Play className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={() => handlePlay()}
            aria-label="Dengarkan narasi"
            className="p-1 text-rose-800 hover:text-rose-950 hover:bg-rose-100 rounded-full transition-colors"
            title="Dengarkan Mister Jo"
          >
            <Play className="w-3.5 h-3.5" />
          </button>
        )}

        {(isSpeaking || isPaused) && (
          <button
            onClick={handleStop}
            aria-label="Hentikan narasi"
            className="p-1 text-slate-600 hover:text-rose-700 hover:bg-rose-100 rounded-full transition-colors"
            title="Hentikan"
          >
            <Square className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={`bg-gradient-to-r from-rose-950 via-rose-900 to-rose-950 text-white rounded-2xl p-4 shadow-lg border border-amber-500/30 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Mister Jo Profile & Sound Wave */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-rose-950 font-black text-lg shadow-md border-2 border-amber-300">
              <span className="tracking-tight">Jo</span>
            </div>
            {isSpeaking && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-amber-300 text-sm md:text-base flex items-center gap-1.5">
                <span>Mister Jo</span>
                <span className="text-[11px] font-semibold text-rose-200/90 uppercase tracking-wider bg-rose-800/80 px-2 py-0.5 rounded-full border border-rose-700">
                  Guru Fisika TKA
                </span>
              </h4>
            </div>
            <p className="text-xs text-rose-200 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{contextLabel}</span>
            </p>
          </div>
        </div>

        {/* Live Audio Visualizer bars */}
        {isSpeaking && (
          <div className="hidden sm:flex items-center gap-1 h-6 px-3 py-1 bg-black/25 rounded-lg border border-white/10">
            <div className="w-1 bg-amber-400 rounded-full animate-[bounce_0.8s_infinite] h-4"></div>
            <div className="w-1 bg-amber-300 rounded-full animate-[bounce_0.6s_infinite_100ms] h-5"></div>
            <div className="w-1 bg-amber-200 rounded-full animate-[bounce_0.7s_infinite_200ms] h-3"></div>
            <div className="w-1 bg-amber-400 rounded-full animate-[bounce_0.9s_infinite_150ms] h-6"></div>
            <div className="w-1 bg-amber-300 rounded-full animate-[bounce_0.5s_infinite_50ms] h-4"></div>
            <span className="text-[11px] text-amber-300 ml-1.5 font-medium">Berbicara...</span>
          </div>
        )}

        {/* TTS Controls Toolbar */}
        <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm p-1.5 rounded-xl border border-white/10">
          {!isSpeaking && !isPaused ? (
            <button
              onClick={() => handlePlay()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-rose-950 font-bold text-xs rounded-lg shadow transition transform active:scale-95"
              aria-label="Putar narasi Mister Jo"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Dengarkan</span>
            </button>
          ) : isSpeaking ? (
            <button
              onClick={handlePause}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-rose-950 font-bold text-xs rounded-lg shadow transition transform active:scale-95"
              aria-label="Jeda suara"
            >
              <Pause className="w-4 h-4 fill-current" />
              <span>Jeda</span>
            </button>
          ) : (
            <button
              onClick={handleResume}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs rounded-lg shadow transition transform active:scale-95"
              aria-label="Lanjutkan suara"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Lanjut</span>
            </button>
          )}

          <button
            onClick={handleReplay}
            className="p-1.5 text-rose-200 hover:text-white hover:bg-white/10 rounded-lg transition"
            title="Ulangi dari awal"
            aria-label="Ulangi narasi"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {(isSpeaking || isPaused) && (
            <button
              onClick={handleStop}
              className="p-1.5 text-rose-300 hover:text-rose-100 hover:bg-red-500/20 rounded-lg transition"
              title="Hentikan narasi"
              aria-label="Hentikan narasi"
            >
              <Square className="w-4 h-4 fill-current text-rose-300" />
            </button>
          )}

          <button
            onClick={cycleRate}
            className="px-2 py-1 text-xs font-semibold text-amber-200 hover:bg-white/10 rounded-lg transition border border-amber-400/20"
            title="Ubah kecepatan bicara"
            aria-label="Kecepatan narasi"
          >
            {settings.rate}x
          </button>
        </div>
      </div>

      {/* Subtitle / active statement preview if playing */}
      {isSpeaking && activeText && (
        <div className="mt-3 pt-2.5 border-t border-rose-800/60 text-xs text-rose-100/90 italic flex items-start gap-2">
          <Volume2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="line-clamp-2">{activeText}</p>
        </div>
      )}
    </div>
  );
};
