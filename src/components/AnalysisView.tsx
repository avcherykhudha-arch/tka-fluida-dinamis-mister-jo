import React from 'react';
import {
  BarChart3,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { UserProgress, TopicSummary } from '../types';
import { calculateGradePredicate } from '../utils/scoring';
import { MisterJoNarrator } from './MisterJoNarrator';

interface AnalysisViewProps {
  progress: UserProgress;
  topicSummaries: TopicSummary[];
  onGoToPractice: () => void;
  onGoToFormulas: () => void;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({
  progress,
  topicSummaries,
  onGoToPractice,
  onGoToFormulas,
}) => {
  const answeredCount = Object.keys(progress.answers).length;
  const checkedCount = Object.keys(progress.checked).length;
  const correctCount = Object.values(progress.isCorrect).filter(Boolean).length;
  const incorrectCount = checkedCount - correctCount;
  const scorePercent = checkedCount > 0 ? (correctCount / checkedCount) * 100 : 0;
  const grade = calculateGradePredicate(scorePercent);

  // Sorting topics by accuracy
  const sortedTopics = [...topicSummaries].sort((a, b) => b.accuracy - a.accuracy);
  const bestTopic = sortedTopics[0];
  const weakestTopic = sortedTopics[sortedTopics.length - 1];

  const narrationText = `Hasil evaluasi latihan Anda menunjukkan skor sebesar ${Math.round(
    scorePercent
  )} persen dengan predikat ${grade.predicate}. ${
    scorePercent >= 80
      ? 'Selamat! Pertahankan ketelitian dan penalaran fisis Anda.'
      : 'Mari perkuat kembali materi yang perlu diperbaiki melalui Bank Rumus.'
  }`;

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Title & Brand */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-900 text-amber-300 flex items-center justify-center font-bold text-xl shadow-md">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-rose-950">
              Dashboard Analisis Hasil TKA
            </h2>
            <p className="text-slate-600 text-sm">
              Evaluasi komprehensif ketuntasan kompetensi fluida dinamis berstandar HOTS
            </p>
          </div>
        </div>

        <MisterJoNarrator
          currentText={narrationText}
          contextLabel="Evaluasi Hasil oleh Mister Jo"
        />

        {/* Score & Predicate Card */}
        <div className="mt-8 bg-gradient-to-br from-rose-950 via-rose-900 to-rose-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-amber-400/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-amber-300 tracking-wider uppercase bg-rose-900/80 px-3 py-1 rounded-full border border-rose-700">
              Hasil Capaian Simulasi
            </span>
            <div className="flex items-baseline justify-center md:justify-start gap-2">
              <h3 className="text-5xl sm:text-6xl font-black text-white">
                {Math.round(scorePercent)}
              </h3>
              <span className="text-2xl font-bold text-rose-300">/ 100</span>
            </div>
            <p className="text-rose-200 text-sm">{grade.description}</p>
          </div>

          <div className="text-center md:text-right space-y-2">
            <span className="text-xs uppercase text-slate-300 font-bold block">
              Predikat Kelulusan:
            </span>
            <div className="inline-block px-5 py-2.5 rounded-2xl bg-amber-400 text-rose-950 font-black text-lg sm:text-xl shadow-lg border-2 border-amber-300">
              {grade.predicate}
            </div>
            <p className="text-xs text-rose-200">
              {correctCount} dari {checkedCount} soal diperiksa bernilai benar
            </p>
          </div>
        </div>

        {/* Quick Numbers */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <p className="text-xs text-slate-500 font-bold uppercase">Dikerjakan</p>
            <h4 className="text-2xl font-black text-slate-800 mt-1">{answeredCount} / 30</h4>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
            <p className="text-xs text-emerald-700 font-bold uppercase">Jumlah Benar</p>
            <h4 className="text-2xl font-black text-emerald-700 mt-1">{correctCount}</h4>
          </div>
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-center">
            <p className="text-xs text-rose-700 font-bold uppercase">Jumlah Salah</p>
            <h4 className="text-2xl font-black text-rose-700 mt-1">{incorrectCount}</h4>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
            <p className="text-xs text-amber-700 font-bold uppercase">Tingkat Ketuntasan</p>
            <h4 className="text-2xl font-black text-amber-700 mt-1">
              {Math.round((answeredCount / 30) * 100)}%
            </h4>
          </div>
        </div>

        {/* Recommendations: Strengths & Weaknesses */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Most Mastered Topic */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-700" />
              <h4 className="font-extrabold text-sm text-emerald-950 uppercase tracking-wider">
                Materi Paling Dikuasai:
              </h4>
            </div>
            <h5 className="font-bold text-base text-emerald-900">{bestTopic?.name}</h5>
            <p className="text-xs sm:text-sm text-slate-700">
              Akurasi Anda mencapai <strong>{bestTopic?.accuracy}%</strong>. Penalaran fisis pada
              materi ini sudah sangat solid!
            </p>
          </div>

          {/* Weakest Topic */}
          <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-700" />
              <h4 className="font-extrabold text-sm text-rose-950 uppercase tracking-wider">
                Materi Perlu Diperbaiki:
              </h4>
            </div>
            <h5 className="font-bold text-base text-rose-900">{weakestTopic?.name}</h5>
            <p className="text-xs sm:text-sm text-slate-700">
              Akurasi tercatat <strong>{weakestTopic?.accuracy}%</strong>. Pelajari kembali Bank
              Rumus dan dengarkan penjelasan trik cara cepat Mister Jo.
            </p>
          </div>
        </div>

        {/* Breakdown by 8 topics */}
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-bold text-rose-950 border-b pb-2">
            Rincian Penguasaan 8 Materi Pokok Fluida Dinamis
          </h3>

          <div className="space-y-3">
            {topicSummaries.map((topic, i) => (
              <div
                key={topic.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-rose-900 bg-rose-100 px-2 py-0.5 rounded">
                      #{i + 1}
                    </span>
                    <span className="font-bold text-sm text-slate-900">{topic.name}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-rose-800 h-full rounded-full transition-all"
                      style={{ width: `${topic.accuracy}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs shrink-0">
                  <span className="text-slate-600">
                    Benar: <strong>{topic.correct}</strong> / {topic.total}
                  </span>
                  <span className="font-black text-rose-950 text-sm w-12 text-right">
                    {topic.accuracy}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap gap-3">
          <button
            onClick={onGoToPractice}
            className="flex items-center gap-2 px-6 py-3 bg-rose-900 text-white font-bold text-sm rounded-xl hover:bg-rose-800 transition"
          >
            <span>Lanjutkan Latihan Soal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onGoToFormulas}
            className="flex items-center gap-2 px-6 py-3 bg-amber-400 text-rose-950 font-bold text-sm rounded-xl hover:bg-amber-300 transition"
          >
            <BookOpen className="w-4 h-4" />
            <span>Buka Bank Rumus</span>
          </button>
        </div>
      </div>
    </div>
  );
};
