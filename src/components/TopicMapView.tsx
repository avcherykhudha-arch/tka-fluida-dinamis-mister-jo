import React from 'react';
import { Compass, CheckCircle2, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { TopicSummary } from '../types';
import { MisterJoNarrator } from './MisterJoNarrator';

interface TopicMapViewProps {
  topicSummaries: TopicSummary[];
  onSelectTopicPractice: (topicId: string) => void;
}

export const TopicMapView: React.FC<TopicMapViewProps> = ({
  topicSummaries,
  onSelectTopicPractice,
}) => {
  const narrationText =
    'Berikut adalah Peta Materi Fluida Dinamis. Terdapat delapan materi pokok yang saling terhubung secara terstruktur, mulai dari sifat fluida ideal, debit dan kontinuitas, kekekalan energi Bernoulli, hingga instrumentasi teknologi venturimeter, tabung Pitot, dan gaya angkat sayap pesawat.';

  const topicDetails: Record<
    string,
    {
      description: string;
      competencies: string[];
      keyEquation: string;
      applications: string[];
    }
  > = {
    sifat_fluida: {
      description: 'Menganalisis sifat-sifat fluida ideal dan perbedaannya dengan fluida riil (viskositas, inkompresibilitas, rezim aliran laminer dan turbulen, serta bilangan Reynolds).',
      competencies: ['Klasifikasi aliran laminer vs turbulen', 'Bilangan Reynolds numerik', 'Kondisi no-slip fluida riil', 'Teorema Torricelli'],
      keyEquation: 'Re = (ρ · v · D) / η < 2000',
      applications: ['Pelumasan turbin PLTA', 'Aliran darah arteri', 'Sistem pelapisan fluida material'],
    },
    debit: {
      description: 'Menganalisis laju volume aliran fluida per satuan waktu dan hubungannya dengan luas penampang serta kelajuan aliran rata-rata.',
      competencies: ['Konversi satuan debit (L/s ke m³/s)', 'Perhitungan waktu pengisian reservoir', 'Debit drainase perkotaan', 'Variasi debit tangki Torricelli'],
      keyEquation: 'Q = V / t = A · v',
      applications: ['Sistem pompa tandon gedung bertingkat', 'Saluran drainase banjir', 'Pengisian waduk irigasi'],
    },
    bernoulli_pipa: {
      description: 'Menerapkan hukum kekekalan energi mekanik fluida sepanjang garis arus pada pipa yang mengalami perubahan penampang dan ketinggian elevasi.',
      competencies: ['Integrasi energi kinetik dan potensial', 'Evaluasi penurunan tekanan statis', 'Perhitungan daya hidrolik pompa', 'Pencegahan fenomena kavitasi'],
      keyEquation: 'P₁ + ½ρv₁² + ρgh₁ = P₂ + ½ρv₂² + ρgh₂',
      applications: ['Pipa pesat penstock PLTA', 'Sistem pompa distribusi air gedung', 'Pipa siphon tangki kimia'],
    },
    kontinuitas: {
      description: 'Menerapkan asas kekekalan massa pada aliran fluida tunak dan inkompresibel pada pipa berpenampang menyempit maupun bercabang paralel.',
      competencies: ['Rasio diameter kuadratik', 'Sistem manifold percabangan banyak', 'Penciutan berkas pancaran air jatuh', 'Venturi flume saluran terbuka'],
      keyEquation: 'A₁ · v₁ = A₂ · v₂ = Σ Q_cabang',
      applications: ['Nozel semprot pemadam kebakaran', 'Percabangan pembuluh kapiler darah', 'Pancuran kran air gravitasi'],
    },
    venturi_tertutup: {
      description: 'Mengukur kelajuan dan debit aliran fluida pada pipa menyempit tertutup menggunakan perbedaan tekanan statis terukur dari transduser sensor digital.',
      competencies: ['Penurunan rumus kecepatan venturi', 'Hubungan akar selisih tekanan', 'Analisis efek Venturi karburator', 'Fluktuasi debit sistem pendingin'],
      keyEquation: 'v₁ = √[ 2ΔP / (ρ ((A₁/A₂)² - 1)) ]',
      applications: ['Saluran pipa gas alam', 'Pipa minyak mentah lepas pantai', 'Venturi karburator motor'],
    },
    venturi_terbuka: {
      description: 'Menganalisis venturimeter yang dihubungkan dengan manometer pipa U berisi zat cair terpisah (raksa) atau tabung piezometer vertikal terbuka.',
      competencies: ['Kesetimbangan bidang isobarik manometer', 'Perhitungan selisih massa jenis (ρ\' - ρ)', 'Pembacaan piezometer vertikal', 'Rasio diameter dari beda tinggi h'],
      keyEquation: 'v₁ = √[ 2(ρ\' - ρ)gh / (ρ ((A₁/A₂)² - 1)) ]',
      applications: ['Laboratorium uji hidraulika', 'Jalur pipa geotermal', 'Kilang pengolahan bahan bakar solar'],
    },
    tabung_pitot: {
      description: 'Menentukan kelajuan aliran gas atau kelajuan terbang pesawat terhadap fluida sekitar berdasarkan konversi tekanan dinamis pada titik stagnasi.',
      competencies: ['Konsep titik stagnasi (v = 0)', 'Hubungan tekanan total dan statis', 'Koreksi densitas ketinggian atmosfer', 'Perhitungan True Airspeed'],
      keyEquation: 'v = √[ 2ΔP / ρ_udara ] = √[ 2ρ\'gh / ρ_udara ]',
      applications: ['Sensor airspeed avionik pesawat terbang', 'Pengujian terowongan angin drone', 'Anemometer gas cerobong industri'],
    },
    gaya_angkat: {
      description: 'Menganalisis prinsip Bernoulli dan perbedaan tekanan aerodinamika pada kontur permukaan atas dan bawah aerofoil sayap pesawat terbang.',
      competencies: ['Selisih kelajuan udara sayap (va > vb)', 'Perbedaan tekanan (Pb > Pa)', 'Kalkulasi gaya angkat aerodinamika', 'Syarat terbang mendatar & lepas landas'],
      keyEquation: 'F_angkat = (P_b - P_a) · A = ½ ρ (v_a² - v_b²) · A',
      applications: ['Fase lepas landas pesawat kargo', 'Ekstensi flap pendaratan sayap', 'Desain aerofoil sayap pesawat komersial'],
    },
  };

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-900 text-amber-300 flex items-center justify-center font-bold text-xl">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-rose-950">
              Peta Materi & Kisi-Kisi TKA Fluida Dinamis
            </h2>
            <p className="text-slate-600 text-sm">
              Struktur konseptual 8 materi pokok dengan sebaran 30 soal HOTS numerik
            </p>
          </div>
        </div>

        <MisterJoNarrator
          currentText={narrationText}
          contextLabel="Penjelasan Peta Materi oleh Mister Jo"
        />

        {/* Conceptual Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {topicSummaries.map((topic, index) => {
            const detail = topicDetails[topic.id];
            return (
              <div
                key={topic.id}
                className="bg-gradient-to-br from-white to-rose-50/30 rounded-2xl p-5 border border-rose-100 shadow-sm hover:shadow-md hover:border-rose-200 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-900 bg-rose-100 px-2.5 py-1 rounded-full border border-rose-200">
                      Materi #{index + 1}
                    </span>
                    <span className="text-xs font-bold text-amber-700 bg-amber-100/70 px-2.5 py-1 rounded-full">
                      {topic.total} Soal HOTS
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg text-slate-900">{topic.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {detail?.description}
                  </p>

                  {/* Key Equation Badge */}
                  <div className="bg-rose-950 text-amber-300 px-3 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold text-center border border-amber-400/30">
                    {detail?.keyEquation}
                  </div>

                  {/* Competencies */}
                  <div className="space-y-1.5 pt-2">
                    <h5 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                      Fokus Penalaran Soal:
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {detail?.competencies.map((comp, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                        >
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    Progres: <strong>{topic.completed}/{topic.total}</strong> ({topic.accuracy}% Benar)
                  </span>
                  <button
                    onClick={() => onSelectTopicPractice(topic.id)}
                    className="inline-flex items-center gap-1 text-rose-900 hover:text-rose-700 font-bold"
                  >
                    <span>Latihan Materi</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
