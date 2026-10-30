import React from 'react';
import {
  FileText,
  CheckSquare,
  HelpCircle,
  Volume2,
  Tv,
  Smartphone,
  MousePointer,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { MisterJoNarrator } from './MisterJoNarrator';

export const InstructionsView: React.FC = () => {
  const narrationText =
    'Berikut adalah petunjuk penggunaan aplikasi Fisika Jenius. Latihan ini memuat tepat tiga puluh soal HOTS yang dibagi menjadi sepuluh pilihan ganda biasa, sepuluh pilihan ganda kompleks, dan sepuluh benar-salah. Kamu dapat memanfaatkan tombol pembimbing Mister Jo sebelum menjawab soal, serta menekan tombol pembahasan untuk melihat strategi normal dan cara cepat.';

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-900 text-amber-300 flex items-center justify-center font-bold text-xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-rose-950">
              Petunjuk Penggunaan Aplikasi
            </h2>
            <p className="text-slate-600 text-sm">
              Panduan lengkap belajar mandiri dan simulasi latihan TKA bersama Mister Jo
            </p>
          </div>
        </div>

        <MisterJoNarrator
          currentText={narrationText}
          contextLabel="Panduan Petunjuk Aplikasi oleh Mister Jo"
        />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 3 Jenis Soal */}
          <div className="bg-rose-50/60 border border-rose-200/80 rounded-2xl p-5 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-rose-800 text-amber-300 flex items-center justify-center font-black text-sm">
              1
            </div>
            <h4 className="font-bold text-rose-950 text-base">3 Format Soal HOTS</h4>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-2 list-disc list-inside">
              <li>
                <strong>Pilihan Ganda (10 Soal):</strong> Pilih satu opsi paling tepat (A, B, C, D, atau E).
              </li>
              <li>
                <strong>Pilihan Ganda Kompleks (10 Soal):</strong> Pilih semua pernyataan yang benar. Jawaban dinilai benar jika seluruh opsi yang dipilih cocok secara presisi.
              </li>
              <li>
                <strong>Benar-Salah (10 Soal):</strong> Tentukan status BENAR atau SALAH pada 3 pernyataan ilmiah numerik.
              </li>
            </ul>
          </div>

          {/* Card 2: Fitur Narator Mister Jo */}
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-5 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-rose-950 flex items-center justify-center font-black text-sm">
              2
            </div>
            <h4 className="font-bold text-amber-950 text-base">Pendamping Suara Mister Jo</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Mister Jo hadir membacakan stimulus wacana, naskah soal, petunjuk arah berpikir
              sebelum Anda menjawab (tanpa membocorkan kunci jawaban), hingga bimbingan cara normal
              dan cara cepat.
            </p>
          </div>

          {/* Card 3: Layar Besar & IFP */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center font-black text-sm">
              3
            </div>
            <h4 className="font-bold text-slate-900 text-base">Optimasi IFP & Komputer</h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Teks berukuran besar dan tipografi tegas dirancang khusus agar sangat nyaman dibaca
              dari jarak jauh saat diproyeksikan pada Interactive Flat Panel (IFP) kelas maupun layar
              laptop/desktop Anda.
            </p>
          </div>
        </div>

        {/* Prosedur Pengerjaan Step-by-Step */}
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-bold text-rose-950 border-b pb-2">
            Langkah-Langkah Pengerjaan Latihan
          </h3>
          <div className="space-y-3 text-sm text-slate-700">
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-rose-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                1
              </span>
              <p>
                <strong>Pelajari Stimulus:</strong> Baca wacana kontekstual, amati tabel hasil
                eksperimen, dan telaah ilustrasi ilmiah secara seksama.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-rose-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                2
              </span>
              <p>
                <strong>Dengarkan Arahan Berpikir:</strong> Jika Anda menemui kesulitan sebelum
                menjawab, tekan tombol <em>"Arahan Berpikir"</em> agar Mister Jo memberikan tips fisis
                tanpa membocorkan jawaban.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-rose-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                3
              </span>
              <p>
                <strong>Pilih Jawaban & Periksa:</strong> Pilih opsi jawaban Anda, lalu tekan tombol
                <em>"Periksa Jawaban"</em> untuk mendapatkan feedback seketika dari Mister Jo.
              </p>
            </div>
            <div className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-rose-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                4
              </span>
              <p>
                <strong>Bandingkan Cara Normal vs Cara Cepat:</strong> Buka panel pembahasan untuk
                mempelajari penurunan 10 poin fisika lengkap beserta trik hitung efisien.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
