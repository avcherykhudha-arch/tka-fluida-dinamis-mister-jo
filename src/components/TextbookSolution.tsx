import React from 'react';
import {
  BookOpen,
  Zap,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Calculator,
  Compass,
  Volume2,
} from 'lucide-react';
import { Question } from '../types';
import { MathView } from './MathView';
import { misterJoTTS } from '../utils/tts';

interface TextbookSolutionProps {
  question: Question;
  activeStrategyTab: 'normal' | 'cepat';
  onTabChange: (tab: 'normal' | 'cepat') => void;
  onSpeakNormal?: () => void;
  onSpeakFast?: () => void;
}

export const TextbookSolution: React.FC<TextbookSolutionProps> = ({
  question,
  activeStrategyTab,
  onTabChange,
  onSpeakNormal,
  onSpeakFast,
}) => {
  const exp = question.explanation;

  const handleSpeakNormal = () => {
    if (onSpeakNormal) {
      onSpeakNormal();
    } else {
      misterJoTTS.speak(question.narratorNarration.normalExplanation);
    }
  };

  const handleSpeakFast = () => {
    if (onSpeakFast) {
      onSpeakFast();
    } else {
      misterJoTTS.speak(question.narratorNarration.fastStrategy);
    }
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-rose-900/80 shadow-2xl overflow-hidden transition-all text-slate-800">
      {/* Textbook Header Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-rose-950 text-white p-5 sm:p-7 border-b-2 border-amber-500/50">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-black uppercase tracking-widest text-amber-300 bg-black/40 px-3 py-1 rounded-full border border-amber-400/40">
                Solusi Matematis Buku Teks • Standar HOTS
              </span>
              <span className="text-[11px] font-bold text-rose-200 bg-rose-800/80 px-2.5 py-0.5 rounded-full">
                Soal #{question.id}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Kajian Teoretis & Solusi Lengkap: {question.title}
            </h3>
            <p className="text-xs sm:text-sm text-rose-200/90 mt-1">
              Materi Pokok: <strong className="text-amber-300">{question.topicName}</strong> • Format:{' '}
              {question.type === 'pg'
                ? 'Pilihan Ganda (5 Opsi)'
                : question.type === 'pgk'
                ? 'Pilihan Ganda Kompleks (Pilihan Majemuk)'
                : 'Benar atau Salah (3 Pernyataan)'}
            </p>
          </div>

          {/* Toggle Strategy Normal vs Cara Cepat */}
          <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/20">
            <button
              onClick={() => onTabChange('normal')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeStrategyTab === 'normal'
                  ? 'bg-amber-400 text-rose-950 font-black shadow-md'
                  : 'text-rose-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Cara Normal (10 Langkah)</span>
            </button>
            <button
              onClick={() => onTabChange('cepat')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeStrategyTab === 'cepat'
                  ? 'bg-amber-400 text-rose-950 font-black shadow-md'
                  : 'text-rose-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <Zap className="w-4 h-4 fill-current text-rose-950" />
              <span>Cara Cepat TKA</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-7">
        {/* Step 1: Identifikasi Konsep */}
        <section className="bg-stone-50/70 p-5 rounded-2xl border border-stone-200/90 space-y-2">
          <div className="flex items-center gap-2 text-rose-900 font-black text-xs uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-rose-900 text-amber-300 text-xs font-bold flex items-center justify-center">
              1
            </span>
            <h4>Identifikasi Konsep Fisis & Fenomena</h4>
          </div>
          <div className="text-sm sm:text-base leading-relaxed text-slate-800 pl-8 font-normal">
            <MathView text={exp.konsep} />
          </div>
        </section>

        {/* Step 2 & 3: Data Fisis Diketahui & Ditanya */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Diketahui */}
          <div className="md:col-span-7 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-slate-700 font-bold text-xs uppercase tracking-wider border-b pb-2">
              <span className="w-6 h-6 rounded-full bg-slate-800 text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h4>Data Fisis yang Diketahui</h4>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-800 pl-2">
              {exp.diketahui.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-800 font-bold mt-0.5">•</span>
                  <div className="font-medium">
                    <MathView text={item} />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Ditanya */}
          <div className="md:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-slate-700 font-bold text-xs uppercase tracking-wider border-b pb-2">
                <span className="w-6 h-6 rounded-full bg-slate-800 text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h4>Besaran yang Ditanyakan</h4>
              </div>
              <div className="mt-3 text-sm sm:text-base font-bold text-rose-950 pl-1 leading-relaxed">
                <MathView text={exp.ditanya} />
              </div>
            </div>
            <div className="text-[11px] font-semibold text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              *Pastikan seluruh variabel disubstitusikan dalam satuan standar internasional (SI).
            </div>
          </div>
        </section>

        {/* Step 4: Persamaan Utama (Textbook Display Math Card) */}
        <section className="bg-gradient-to-r from-rose-950 via-rose-900 to-rose-950 text-white p-5 sm:p-6 rounded-2xl shadow-lg border-2 border-amber-400/40 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-rose-200 text-xs font-bold uppercase tracking-widest">
            <span className="w-5 h-5 rounded-full bg-amber-400 text-rose-950 text-[11px] font-black flex items-center justify-center">
              4
            </span>
            <span>Hukum Fisika & Persamaan Matematis Pokok</span>
          </div>
          <div className="py-2 text-amber-200 text-lg sm:text-2xl font-serif tracking-wide">
            <MathView text={exp.rumus} block className="text-xl sm:text-2xl" />
          </div>
        </section>

        {/* Step 5: Analisis Hubungan Fisis Antarvariabel */}
        <section className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-rose-900 font-black text-xs uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-rose-900 text-amber-300 text-xs font-bold flex items-center justify-center">
              5
            </span>
            <h4>Analisis Pemilihan Persamaan & Perilaku Fisis</h4>
          </div>
          <div className="text-xs sm:text-sm text-slate-800 leading-relaxed pl-8 space-y-2">
            <MathView text={exp.analisis} />
          </div>
        </section>

        {/* Step 6: Penurunan Rumus & Perhitungan Aljabar Lengkap */}
        <section className="bg-slate-50/80 p-5 sm:p-7 rounded-2xl border-2 border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-rose-950 font-black text-xs uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-rose-900 text-amber-300 text-xs font-bold flex items-center justify-center">
              6
            </span>
            <h4>Langkah Penyelesaian Matematis & Substitusi Aljabar Bertingkat</h4>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/90 shadow-inner overflow-x-auto text-sm sm:text-base leading-relaxed text-slate-900 font-serif">
            <MathView text={exp.penyelesaian} />
          </div>
        </section>

        {/* Detail Pembuktian Opsi untuk PGK & Pernyataan Benar-Salah */}
        {question.type === 'pgk' && question.pgkOptions && (
          <section className="bg-amber-50/40 p-5 sm:p-6 rounded-2xl border border-amber-200/80 space-y-3">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-amber-950 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-700" />
              <span>Verifikasi Matematis Tiap Opsi Pilihan Ganda Kompleks:</span>
            </h4>
            <div className="space-y-2.5">
              {question.pgkOptions.map((opt) => (
                <div
                  key={opt.id}
                  className={`p-3.5 rounded-xl border text-xs sm:text-sm flex flex-col sm:flex-row sm:items-start justify-between gap-2 ${
                    opt.isCorrect
                      ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50/70 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-black px-2 py-0.5 rounded bg-white border shrink-0 text-xs">
                      Opsi {opt.id}
                    </span>
                    <span className="font-semibold text-slate-800">
                      <MathView text={opt.text} />
                    </span>
                  </div>
                  <div className="text-xs font-medium sm:text-right shrink-0">
                    <span className={opt.isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                      {opt.isCorrect ? '✓ [BENAR]' : '✗ [SALAH]'}:
                    </span>{' '}
                    <MathView text={opt.reason} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {question.type === 'bs' && question.bsStatements && (
          <section className="bg-blue-50/40 p-5 sm:p-6 rounded-2xl border border-blue-200/80 space-y-3">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-blue-950 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-blue-700" />
              <span>Verifikasi Matematis Tiap Pernyataan Benar-Salah:</span>
            </h4>
            <div className="space-y-2.5">
              {question.bsStatements.map((st, sIdx) => (
                <div
                  key={st.id}
                  className={`p-3.5 rounded-xl border text-xs sm:text-sm flex flex-col sm:flex-row sm:items-start justify-between gap-2 ${
                    st.isTrue
                      ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50/70 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-black px-2 py-0.5 rounded bg-white border shrink-0 text-xs">
                      Pernyataan #{sIdx + 1}
                    </span>
                    <span className="font-semibold text-slate-800">
                      <MathView text={st.statement} />
                    </span>
                  </div>
                  <div className="text-xs font-medium sm:text-right shrink-0">
                    <span className={st.isTrue ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                      Status: {st.isTrue ? 'BENAR' : 'SALAH'}
                    </span>{' '}
                    — <MathView text={st.reason} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Step 7: Hasil Akhir */}
        <section className="bg-emerald-50/90 p-5 rounded-2xl border-2 border-emerald-400 flex items-center justify-between gap-4 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-emerald-800 font-black text-xs uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[11px] font-bold flex items-center justify-center">
                7
              </span>
              <h4>Hasil Akhir & Kunci Jawaban Resmi</h4>
            </div>
            <p className="text-base sm:text-lg font-black text-emerald-950 mt-1 pl-7">
              <MathView text={exp.hasilAkhir} />
            </p>
          </div>
          <CheckCircle2 className="w-10 h-10 text-emerald-600 shrink-0" />
        </section>

        {/* Step 8: Trik Cara Cepat TKA (Mister Jo) */}
        <section className="bg-gradient-to-r from-amber-50 via-amber-100/50 to-amber-50 p-5 sm:p-6 rounded-2xl border-2 border-amber-400 space-y-2.5 shadow-sm">
          <div className="flex items-center gap-2 text-amber-950 font-black text-xs uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-rose-950 text-xs font-black flex items-center justify-center">
              8
            </span>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-700 fill-current" />
              <span>Strategi Cara Cepat TKA Mister Jo (Taktik Hemat Waktu)</span>
            </div>
          </div>
          <div className="text-xs sm:text-sm text-slate-900 leading-relaxed pl-8 font-medium space-y-2">
            <MathView text={exp.caraCepat} />
          </div>
        </section>

        {/* Step 9 & 10: Jebakan Umum Siswa & Kesimpulan */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Kesalahan Umum */}
          <div className="bg-rose-50/80 p-5 rounded-2xl border border-rose-300 space-y-2 shadow-sm">
            <div className="flex items-center gap-2 text-rose-950 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-rose-700" />
              <h4>9. Miskonsepsi & Jebakan Umum Siswa</h4>
            </div>
            <div className="text-xs sm:text-sm text-slate-800 leading-relaxed pl-6">
              <MathView text={exp.kesalahanUmum} />
            </div>
          </div>

          {/* Kesimpulan */}
          <div className="bg-blue-50/80 p-5 rounded-2xl border border-blue-300 space-y-2 shadow-sm">
            <div className="flex items-center gap-2 text-blue-950 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-blue-700" />
              <h4>10. Kesimpulan Konseptual</h4>
            </div>
            <div className="text-xs sm:text-sm text-slate-800 leading-relaxed pl-6">
              <MathView text={exp.kesimpulan} />
            </div>
          </div>
        </section>

        {/* Perbandingan Strategi Normal vs Cepat */}
        <section className="bg-purple-50/70 p-5 rounded-2xl border border-purple-200 space-y-2">
          <div className="flex items-center gap-2 text-purple-950 font-bold text-xs uppercase tracking-wider">
            <Compass className="w-4 h-4 text-purple-700" />
            <h4>Evaluasi Perbandingan: Cara Normal vs Cara Cepat</h4>
          </div>
          <div className="text-xs sm:text-sm text-slate-800 leading-relaxed pl-6 font-medium">
            <MathView text={exp.perbandinganStrategi} />
          </div>
        </section>
      </div>
    </div>
  );
};
