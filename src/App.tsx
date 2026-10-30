import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { InstructionsView } from './components/InstructionsView';
import { TopicMapView } from './components/TopicMapView';
import { FormulaBankView } from './components/FormulaBankView';
import { PracticeView } from './components/PracticeView';
import { ExplanationsDirectoryView } from './components/ExplanationsDirectoryView';
import { AnalysisView } from './components/AnalysisView';
import { ProgressView } from './components/ProgressView';
import { TTSConfigView } from './components/TTSConfigView';
import { QUESTIONS_DATA } from './data/questions';
import { UserProgress } from './types';
import { evaluateAnswer, computeTopicSummaries } from './utils/scoring';
import { misterJoTTS } from './utils/tts';

const LOCAL_STORAGE_KEY = 'fisika_jenius_master_fluida_progress_v1';

const INITIAL_PROGRESS: UserProgress = {
  answers: {},
  flagged: {},
  checked: {},
  isCorrect: {},
  startedAt: Date.now(),
  lastUpdated: Date.now(),
  currentQuestionId: 1,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('beranda');
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return { ...INITIAL_PROGRESS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Gagal memuat progres dari localStorage:', e);
    }
    return INITIAL_PROGRESS;
  });

  // Auto-save progress to localStorage on any state change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Gagal menyimpan progres ke localStorage:', e);
    }
  }, [progress]);

  // Compute topic metrics dynamically
  const topicSummaries = useMemo(() => {
    return computeTopicSummaries(QUESTIONS_DATA, progress);
  }, [progress]);

  // Total stats
  const progressCount = useMemo(() => {
    const answered = Object.keys(progress.answers).length;
    const correct = Object.values(progress.isCorrect).filter(Boolean).length;
    return {
      total: QUESTIONS_DATA.length,
      answered,
      correct,
    };
  }, [progress]);

  // Tab change handler with automatic TTS narration trigger and voice stopping
  const handleTabChange = useCallback((newTab: ActiveTab) => {
    misterJoTTS.stop();
    setActiveTab(newTab);

    // Menu intro narrations for Mister Jo
    const menuNarrations: Record<ActiveTab, string> = {
      beranda:
        'Selamat datang kembali di Beranda Fisika Jenius. Di sini Anda dapat memantau ringkasan capaian belajar dan memilih menu pembelajaran.',
      petunjuk:
        'Halaman petunjuk penggunaan aplikasi. Bacalah panduan tiga format soal dan strategi belajar bersama Mister Jo.',
      peta:
        'Peta materi fluida dinamis. Pelajari sebaran delapan materi pokok dan kompetensi yang diuji pada setiap soal.',
      rumus:
        'Bank rumus fluida dinamis lengkap dengan notasi KaTeX, besaran, satuan internasional, dan contoh substitusi angka.',
      latihan:
        'Ruang latihan TKA tiga puluh soal fluida dinamis. Bacalah stimulus dengan teliti dan gunakan arahan berpikir sebelum menjawab.',
      pembahasan:
        'Direktori pembahasan seluruh tiga puluh soal. Pelajari cara normal sepuluh langkah dan taktik cara cepat Mister Jo.',
      analisis:
        'Dashboard evaluasi hasil latihan. Periksa skor, predikat kelulusan, dan rekomendasi penguatan materi Anda.',
      progres:
        'Status progres belajar offline. Seluruh jawaban Anda tersimpan otomatis di peramban tanpa perlu koneksi internet.',
      pengaturan:
        'Pengaturan suara narator Mister Jo. Atur kecepatan bicara, nada suara, dan volume sesuai kenyamanan belajar Anda.',
    };

    const narration = menuNarrations[newTab];
    if (narration) {
      misterJoTTS.speak(narration);
    }
  }, []);

  // Question navigation handler
  const handleNavigateQuestion = useCallback((qId: number) => {
    misterJoTTS.stop();
    setProgress((prev) => ({
      ...prev,
      currentQuestionId: qId,
      lastUpdated: Date.now(),
    }));
  }, []);

  // Update Answer
  const handleUpdateAnswer = useCallback((qId: number, answer: any) => {
    setProgress((prev) => ({
      ...prev,
      answers: { ...prev.answers, [qId]: answer },
      lastUpdated: Date.now(),
    }));
  }, []);

  // Toggle Flag
  const handleToggleFlag = useCallback((qId: number) => {
    setProgress((prev) => ({
      ...prev,
      flagged: { ...prev.flagged, [qId]: !prev.flagged[qId] },
      lastUpdated: Date.now(),
    }));
  }, []);

  // Check Answer
  const handleCheckAnswer = useCallback((qId: number) => {
    const question = QUESTIONS_DATA.find((q) => q.id === qId);
    if (!question) return;

    setProgress((prev) => {
      const ans = prev.answers[qId];
      const correct = evaluateAnswer(question, ans);
      return {
        ...prev,
        checked: { ...prev.checked, [qId]: true },
        isCorrect: { ...prev.isCorrect, [qId]: correct },
        lastUpdated: Date.now(),
      };
    });
  }, []);

  // Reset Progress
  const handleResetAllProgress = useCallback(() => {
    misterJoTTS.stop();
    const fresh: UserProgress = {
      answers: {},
      flagged: {},
      checked: {},
      isCorrect: {},
      startedAt: Date.now(),
      lastUpdated: Date.now(),
      currentQuestionId: 1,
    };
    setProgress(fresh);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    misterJoTTS.speak('Seluruh progres latihan berhasil direset. Mari kita mulai belajar kembali dari soal pertama!');
  }, []);

  // Repeat Practice (keep formulas, reset answers)
  const handleRepeatPractice = useCallback(() => {
    handleResetAllProgress();
    setActiveTab('latihan');
  }, [handleResetAllProgress]);

  // Jump to specific topic from Topic Map
  const handleSelectTopicPractice = useCallback((topicId: string) => {
    const firstQOfTopic = QUESTIONS_DATA.find((q) => q.topicId === topicId);
    if (firstQOfTopic) {
      handleNavigateQuestion(firstQOfTopic.id);
    }
    handleTabChange('latihan');
  }, [handleNavigateQuestion, handleTabChange]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbf9] text-slate-800 antialiased selection:bg-rose-900 selection:text-white">
      {/* Top Header Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        progressCount={progressCount}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {activeTab === 'beranda' && (
          <HomeView
            progress={progress}
            topicSummaries={topicSummaries}
            onStartPractice={() => handleTabChange('latihan')}
            onResumePractice={() => handleTabChange('latihan')}
            onOpenFormulas={() => handleTabChange('rumus')}
            onOpenGuide={() => handleTabChange('petunjuk')}
          />
        )}

        {activeTab === 'petunjuk' && <InstructionsView />}

        {activeTab === 'peta' && (
          <TopicMapView
            topicSummaries={topicSummaries}
            onSelectTopicPractice={handleSelectTopicPractice}
          />
        )}

        {activeTab === 'rumus' && <FormulaBankView />}

        {activeTab === 'latihan' && (
          <PracticeView
            questions={QUESTIONS_DATA}
            progress={progress}
            onUpdateAnswer={handleUpdateAnswer}
            onToggleFlag={handleToggleFlag}
            onCheckAnswer={handleCheckAnswer}
            onNavigateQuestion={handleNavigateQuestion}
          />
        )}

        {activeTab === 'pembahasan' && (
          <ExplanationsDirectoryView
            questions={QUESTIONS_DATA}
            onSelectQuestion={(id) => {
              handleNavigateQuestion(id);
              handleTabChange('latihan');
            }}
          />
        )}

        {activeTab === 'analisis' && (
          <AnalysisView
            progress={progress}
            topicSummaries={topicSummaries}
            onGoToPractice={() => handleTabChange('latihan')}
            onGoToFormulas={() => handleTabChange('rumus')}
          />
        )}

        {activeTab === 'progres' && (
          <ProgressView
            progress={progress}
            onResumePractice={() => handleTabChange('latihan')}
            onRepeatPractice={handleRepeatPractice}
            onResetAllProgress={handleResetAllProgress}
          />
        )}

        {activeTab === 'pengaturan' && <TTSConfigView />}
      </main>

      {/* Footer */}
      <footer className="bg-rose-950 text-rose-200 border-t-2 border-amber-500/30 py-8 px-4 sm:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <div>
            <p className="font-extrabold text-white text-base">
              FISIKA JENIUS – MASTER FLUIDA DINAMIS
            </p>
            <p className="text-rose-300 mt-0.5">
              "Berpikir Fisis, Bernalar Kritis, Menaklukkan TKA!" • Bersama Guru Pembimbing Mister Jo
            </p>
          </div>
          <div className="text-center sm:text-right text-rose-300/80">
            <p>30 Soal HOTS Numerik • Pembahasan Normal & Trik Cara Cepat</p>
            <p className="text-[11px] text-amber-400 mt-0.5">
              Siap Digunakan di Desktop, Tablet, dan Interactive Flat Panel (IFP)
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
