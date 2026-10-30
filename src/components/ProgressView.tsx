import React, { useState } from 'react';
import {
  RotateCcw,
  Play,
  Trash2,
  AlertTriangle,
  HardDrive,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import { UserProgress } from '../types';
import { MisterJoNarrator } from './MisterJoNarrator';

interface ProgressViewProps {
  progress: UserProgress;
  onResumePractice: () => void;
  onRepeatPractice: () => void;
  onResetAllProgress: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  progress,
  onResumePractice,
  onRepeatPractice,
  onResetAllProgress,
}) => {
  const [resetModalStep, setResetModalStep] = useState<0 | 1 | 2>(0); // 0 = closed, 1 = first confirm, 2 = final confirm
  const [confirmationInput, setConfirmationInput] = useState<string>('');

  const answeredCount = Object.keys(progress.answers).length;
  const checkedCount = Object.keys(progress.checked).length;
  const correctCount = Object.values(progress.isCorrect).filter(Boolean).length;
  const flaggedCount = Object.values(progress.flagged).filter(Boolean).length;

  const narrationText =
    'Ini adalah halaman kontrol progres belajar offline. Semua jawaban, status soal, penanda ragu-ragu, dan skor Anda tersimpan otomatis di peramban tanpa memerlukan koneksi internet. Anda dapat melanjutkan belajar kapan saja.';

  const handleStartReset = () => {
    setResetModalStep(1);
    setConfirmationInput('');
  };

  const handleConfirmStep1 = () => {
    setResetModalStep(2);
  };

  const handleFinalReset = () => {
    if (confirmationInput.trim().toUpperCase() === 'RESET') {
      onResetAllProgress();
      setResetModalStep(0);
      setConfirmationInput('');
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Title */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-900 text-amber-300 flex items-center justify-center font-bold text-xl shadow-md">
            <RotateCcw className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-rose-950">
              Progres Belajar & Penyimpanan Offline
            </h2>
            <p className="text-slate-600 text-sm">
              Status penyimpanan otomatis browser (localStorage) dan kontrol sesi latihan
            </p>
          </div>
        </div>

        <MisterJoNarrator
          currentText={narrationText}
          contextLabel="Penjelasan Progres Belajar oleh Mister Jo"
        />

        {/* Offline Storage Status Banner */}
        <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
          <HardDrive className="w-6 h-6 text-emerald-700 shrink-0" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold text-emerald-950">Penyimpanan Otomatis Aktif:</span>{' '}
            <span className="text-emerald-800">
              Setiap kali Anda memilih opsi jawaban, data langsung tersimpan secara aman di memori lokal peramban Anda. Anda dapat menutup peramban dan melanjutkan latihan sewaktu-waktu.
            </span>
          </div>
        </div>

        {/* Session Stats Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <p className="text-xs text-slate-500 font-semibold uppercase">Soal Terakhir</p>
            <h4 className="text-2xl font-black text-slate-800 mt-0.5">
              Nomor #{progress.currentQuestionId}
            </h4>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <p className="text-xs text-slate-500 font-semibold uppercase">Soal Terjawab</p>
            <h4 className="text-2xl font-black text-slate-800 mt-0.5">{answeredCount} / 30</h4>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <p className="text-xs text-slate-500 font-semibold uppercase">Diperiksa & Benar</p>
            <h4 className="text-2xl font-black text-emerald-600 mt-0.5">{correctCount} soal</h4>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <p className="text-xs text-slate-500 font-semibold uppercase">Ditandai Ragu</p>
            <h4 className="text-2xl font-black text-amber-600 mt-0.5">{flaggedCount} soal</h4>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-8 space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b pb-2">
            Aksi Kontrol Belajar Siswa:
          </h3>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={onResumePractice}
              className="flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-rose-900 to-rose-800 hover:from-rose-850 hover:to-rose-750 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-md transition"
            >
              <Play className="w-5 h-5 fill-current text-amber-300" />
              <span>LANJUTKAN BELAJAR</span>
            </button>

            <button
              onClick={onRepeatPractice}
              className="flex items-center gap-2.5 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm sm:text-base rounded-2xl border border-slate-300 transition"
            >
              <RotateCcw className="w-5 h-5 text-rose-800" />
              <span>ULANGI LATIHAN</span>
            </button>

            <button
              onClick={handleStartReset}
              className="flex items-center gap-2 px-5 py-3.5 bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold text-sm sm:text-base rounded-2xl border border-rose-300 transition"
            >
              <Trash2 className="w-5 h-5" />
              <span>RESET SELURUH PROGRES</span>
            </button>
          </div>
        </div>
      </div>

      {/* Two-Step Confirmation Modal for Progress Reset */}
      {resetModalStep > 0 && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-rose-600 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-7 h-7" />
            </div>

            {resetModalStep === 1 ? (
              <>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-black text-rose-950">
                    Konfirmasi Tahap 1: Reset Progres?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Tindakan ini akan mengosongkan seluruh jawaban, nilai skor, dan penanda ragu-ragu
                    dari memori peramban Anda. Apakah Anda yakin ingin memulai latihan dari awal?
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setResetModalStep(0)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-100"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleConfirmStep1}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 text-rose-950 font-black text-sm hover:bg-amber-400"
                  >
                    Lanjutkan ke Tahap 2
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-black text-rose-950">
                    Konfirmasi Tahap 2 (Final)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Untuk memastikan bukan klik yang tidak disengaja, ketik kata{' '}
                    <strong className="text-rose-800 font-black">RESET</strong> pada kotak di bawah
                    ini untuk menghapus data.
                  </p>
                </div>

                <div>
                  <input
                    type="text"
                    value={confirmationInput}
                    onChange={(e) => setConfirmationInput(e.target.value)}
                    placeholder="Ketik RESET"
                    className="w-full text-center tracking-widest font-black uppercase text-base py-3 border-2 border-rose-300 rounded-xl focus:outline-none focus:border-rose-700"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setResetModalStep(0)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-100"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleFinalReset}
                    disabled={confirmationInput.trim().toUpperCase() !== 'RESET'}
                    className="px-5 py-2.5 rounded-xl bg-rose-700 text-white font-black text-sm hover:bg-rose-800 disabled:opacity-30 disabled:pointer-events-none"
                  >
                    Hapus Seluruh Progres
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
