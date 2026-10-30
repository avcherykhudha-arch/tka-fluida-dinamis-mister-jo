import React from 'react';
import {
  Play,
  RotateCcw,
  BookOpen,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { UserProgress, TopicSummary } from '../types';
import { calculateGradePredicate } from '../utils/scoring';
import { MisterJoNarrator } from './MisterJoNarrator';
import { misterJoTTS } from '../utils/tts';

interface HomeViewProps {
  progress: UserProgress;
  topicSummaries: TopicSummary[];
  onStartPractice: () => void;
  onResumePractice: () => void;
  onOpenFormulas: () => void;
  onOpenGuide: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  progress,
  topicSummaries,
  onStartPractice,
  onResumePractice,
  onOpenFormulas,
  onOpenGuide,
}) => {
  const answeredCount = Object.keys(progress.answers).length;
  const checkedCount = Object.keys(progress.checked).length;
  const correctCount = Object.values(progress.isCorrect).filter(Boolean).length;
  const scorePercent = checkedCount > 0 ? (correctCount / checkedCount) * 100 : 0;
  const grade = calculateGradePredicate(scorePercent);

  const welcomeNarration =
    'Halo siswa cerdas Indonesia! Selamat datang di Fisika Jenius – Master Fluida Dinamis bersama saya, Mister Jo. Melalui aplikasi ini, kamu tidak hanya akan menghafal rumus, melainkan belajar berpikir fisis dan bernalar kritis untuk menaklukkan soal-soal TKA berstandar HOTS tertinggi. Mari kita mulai perjalanan belajarmu sekarang!';

  const handlePlayWelcome = () => {
    misterJoTTS.speak(welcomeNarration);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-950 via-rose-900 to-rose-950 text-white p-6 sm:p-10 shadow-2xl border-2 border-amber-500/40">
        {/* Subtle decorative background water particles/waves */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
            <path
              d="M 0 100 Q 200 60 400 100 T 800 100 L 800 400 L 0 400 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Info */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs sm:text-sm font-bold tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>SIMULASI TKA FISIKA SMA • STANDAR HOTS NASIONAL</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                FISIKA JENIUS
              </h1>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-amber-300 tracking-tight mt-1">
                MASTER FLUIDA DINAMIS
              </h2>
              <p className="text-base sm:text-lg text-rose-100 font-medium italic mt-2">
                "Berpikir Fisis, Bernalar Kritis, Menaklukkan TKA!"
              </p>
            </div>

            <p className="text-rose-100/90 text-sm sm:text-base leading-relaxed">
              Selamat datang di laboratorium pembelajaran interaktif bersama{' '}
              <strong className="text-amber-300 font-bold">Mister Jo</strong>. Kuasai konsep
              debit, asas kontinuitas, persamaan Bernoulli, venturimeter, tabung Pitot, dan gaya
              angkat sayap pesawat melalui 30 soal penalaran numerik tingkat tinggi lengkap dengan
              pembahasan normal dan cara cepat.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onStartPractice}
                className="flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-rose-950 font-extrabold text-sm sm:text-base rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Mulai Latihan Baru</span>
              </button>

              {answeredCount > 0 && (
                <button
                  onClick={onResumePractice}
                  className="flex items-center gap-2.5 px-6 py-3.5 bg-rose-800 hover:bg-rose-700 text-white font-bold text-sm sm:text-base rounded-2xl border border-rose-600/80 shadow transition-all transform hover:-translate-y-0.5"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Lanjutkan Belajar (Soal #{progress.currentQuestionId})</span>
                </button>
              )}

              <button
                onClick={onOpenFormulas}
                className="flex items-center gap-2.5 px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base rounded-2xl border border-white/20 transition-all"
              >
                <BookOpen className="w-5 h-5 text-amber-300" />
                <span>Bank Rumus</span>
              </button>
            </div>
          </div>

          {/* Interactive Fluid Animation & Teacher Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400 text-rose-950 font-black text-xl flex items-center justify-center shadow-md border-2 border-amber-200">
                    Jo
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Mister Jo</h3>
                    <p className="text-xs text-amber-300 font-semibold">Guru Pembimbing Fisika TKA</p>
                  </div>
                </div>
                <button
                  onClick={handlePlayWelcome}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 text-xs font-bold rounded-xl border border-amber-400/40 transition"
                  title="Dengarkan Suara Mister Jo"
                >
                  <span>Sapaan Guru</span>
                </button>
              </div>

              {/* Animated Streamline Fluid Visualization Canvas/SVG */}
              <div className="my-3 py-2 bg-rose-950/60 rounded-xl p-3 border border-rose-800/80">
                <div className="flex items-center justify-between text-xs text-rose-300 mb-1.5 font-medium">
                  <span>Simulasi Aliran Venturi Dinamis</span>
                  <span className="text-amber-400 font-bold">A₁v₁ = A₂v₂</span>
                </div>
                <svg viewBox="0 0 400 120" className="w-full h-24">
                  {/* Venturi pipe outline */}
                  <path
                    d="M 10 30 L 130 30 L 180 50 L 220 50 L 270 30 L 390 30 L 390 90 L 270 90 L 220 70 L 180 70 L 130 90 L 10 90 Z"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="2.5"
                  />
                  {/* Flow streamlines */}
                  <path
                    d="M 20 45 C 100 45, 170 55, 200 55 C 230 55, 300 45, 380 45"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="2"
                    strokeDasharray="8 4"
                    className="animate-[dash_1s_linear_infinite]"
                  />
                  <path
                    d="M 20 60 C 100 60, 170 60, 200 60 C 230 60, 300 60, 380 60"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    strokeDasharray="10 4"
                    className="animate-[dash_0.8s_linear_infinite]"
                  />
                  <path
                    d="M 20 75 C 100 75, 170 65, 200 65 C 230 65, 300 75, 380 75"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="2"
                    strokeDasharray="8 4"
                    className="animate-[dash_1s_linear_infinite]"
                  />
                  {/* Text indicators */}
                  <text x="50" y="22" fill="#fed7aa" fontSize="11" fontWeight="bold">Penampang A₁</text>
                  <text x="175" y="42" fill="#fef08a" fontSize="10" fontWeight="bold">Leher A₂</text>
                  <text x="300" y="22" fill="#fed7aa" fontSize="11" fontWeight="bold">Penampang A₁</text>
                </svg>
                <div className="flex justify-between text-[11px] text-rose-300/80 px-2">
                  <span>Kecepatan rendah, Tekanan tinggi</span>
                  <span className="text-amber-300 font-semibold">Kecepatan tinggi, Tekanan anjlok</span>
                </div>
              </div>

              {/* Current Progress Pill */}
              <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-rose-200">Progres Pengerjaan Anda:</span>
                <span className="text-amber-300 font-bold">
                  {answeredCount} dari 30 Soal ({Math.round((answeredCount / 30) * 100)}%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mister Jo Floating Speech Player */}
      <MisterJoNarrator
        currentText={welcomeNarration}
        contextLabel="Sapaan & Pengantar Aplikasi oleh Mister Jo"
      />

      {/* Last Progress & Quick Stats Card */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-900 flex items-center justify-center font-bold">
            <Activity className="w-6 h-6 text-rose-800" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Soal Dikerjakan</p>
            <h4 className="text-2xl font-black text-slate-800">{answeredCount} <span className="text-xs text-slate-400 font-normal">/ 30</span></h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Jawaban Benar</p>
            <h4 className="text-2xl font-black text-emerald-600">{correctCount} <span className="text-xs text-slate-400 font-normal">soal</span></h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
            <Award className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Akurasi Skor</p>
            <h4 className="text-2xl font-black text-amber-600">{Math.round(scorePercent)}%</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center font-bold">
            <Zap className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Predikat Prestasi</p>
            <h4 className="text-sm font-black text-slate-800 truncate">{grade.predicate}</h4>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-rose-950">
              Keunggulan Belajar Bersama Mister Jo
            </h3>
            <p className="text-slate-600 text-sm">
              Dirancang khusus untuk membimbing siswa SMA dari pemahaman konsep fisis hingga penalaran TKA tingkat tinggi.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-900 text-amber-300 flex items-center justify-center font-bold">
              1
            </div>
            <h4 className="font-extrabold text-base text-slate-900">
              30 Soal HOTS Numerik Bermutu Tinggi
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Mencakup 10 Pilihan Ganda biasa, 10 Pilihan Ganda Kompleks, dan 10 Benar-Salah yang
              terdistribusi seimbang pada 8 materi pokok fluida dinamis.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-rose-950 flex items-center justify-center font-bold">
              2
            </div>
            <h4 className="font-extrabold text-base text-slate-900">
              Dua Strategi: Cara Normal & Cara Cepat
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Setiap soal dilengkapi penurunan konsep formal ilmiah dan taktik kilat TKA tanpa rumus
              sulap, disertai evaluasi perbandingan strategi dan jebakan umum.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-900 text-white flex items-center justify-center font-bold">
              3
            </div>
            <h4 className="font-extrabold text-base text-slate-900">
              Bimbingan Narator Suara Interaktif
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Mister Jo mendampingi langsung membaca stimulus, soal, petunjuk berpikir sebelum
              menjawab, hingga pembahasan suara yang santun, sabar, dan bersahabat.
            </p>
          </div>
        </div>
      </section>

      {/* 8 Core Topic Cards Preview */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-extrabold text-rose-950">
              Distribusi 8 Materi Pokok Fluida Dinamis
            </h3>
            <p className="text-slate-600 text-sm">
              Seluruh kisi-kisi terdistribusi berimbang dengan 4 hingga 3 soal per materi.
            </p>
          </div>
          <button
            onClick={onStartPractice}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-rose-900 hover:text-rose-700"
          >
            <span>Uji Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topicSummaries.map((topic, idx) => (
            <div
              key={topic.id}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-rose-50/50 hover:border-rose-200 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-rose-800 bg-rose-100/70 px-2 py-0.5 rounded-md">
                  Materi #{idx + 1}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {topic.total} Soal
                </span>
              </div>
              <h4 className="font-bold text-slate-800 text-sm mb-1">{topic.name}</h4>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-3">
                <div
                  className="bg-rose-700 h-full rounded-full transition-all"
                  style={{
                    width: `${topic.total > 0 ? (topic.completed / topic.total) * 100 : 0}%`,
                  }}
                />
              </div>
              <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1.5">
                <span>Selesai: {topic.completed}/{topic.total}</span>
                <span className="font-bold text-emerald-700">{topic.accuracy}% Benar</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
