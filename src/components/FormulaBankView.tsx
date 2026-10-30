import React, { useState } from 'react';
import { BookOpen, Search, Filter, AlertTriangle, CheckCircle, Calculator, Info } from 'lucide-react';
import { FORMULA_BANK } from '../data/formulas';
import { MathView } from './MathView';
import { MisterJoNarrator } from './MisterJoNarrator';

export const FormulaBankView: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const narrationText =
    'Selamat datang di Bank Rumus Fluida Dinamis. Di sini kamu dapat mempelajari seluruh rumus penting, arti setiap besaran dalam satuan internasional, syarat fisis penggunaan rumus, contoh substitusi angka singkat, dan jebakan umum yang sering mengecoh siswa dalam ujian TKA.';

  const filteredFormulas = FORMULA_BANK.filter((item) => {
    const matchesTopic = selectedTopic === 'all' || item.topicId === selectedTopic;
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.topicName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.variables.some((v) => v.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTopic && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-900 text-amber-300 flex items-center justify-center font-bold text-xl shadow-md">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-rose-950">
                BANK RUMUS FLUIDA DINAMIS
              </h2>
              <p className="text-slate-600 text-sm">
                Ensiklopedi persamaan fisika terverifikasi dengan notasi ilmiah KaTeX presisi tinggi
              </p>
            </div>
          </div>
        </div>

        <MisterJoNarrator
          currentText={narrationText}
          contextLabel="Bimbingan Bank Rumus oleh Mister Jo"
        />

        {/* Filter & Search Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari rumus, besaran, atau materi..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-rose-800"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-rose-800"
            >
              <option value="all">Semua Materi (8 Topik)</option>
              <option value="sifat_fluida">Sifat Fluida Dinamis</option>
              <option value="debit">Konsep Debit</option>
              <option value="bernoulli_pipa">Bernoulli Pipa Ketinggian</option>
              <option value="kontinuitas">Asas Kontinuitas</option>
              <option value="venturi_tertutup">Venturimeter Tertutup</option>
              <option value="venturi_terbuka">Venturimeter Terbuka</option>
              <option value="tabung_pitot">Tabung Pitot</option>
              <option value="gaya_angkat">Gaya Angkat Pesawat</option>
            </select>
          </div>
        </div>
      </div>

      {/* Formula Cards List */}
      <div className="space-y-6">
        {filteredFormulas.map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm hover:shadow-md transition-shadow space-y-6"
          >
            {/* Title & Topic badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-rose-900 text-amber-300 font-bold text-xs flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-xs font-bold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                  {item.topicName}
                </span>
              </div>
              <h3 className="font-black text-lg sm:text-xl text-slate-900">{item.title}</h3>
            </div>

            {/* Scientific Math Formula Display */}
            <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-rose-950 text-white rounded-2xl p-5 shadow-inner text-center border-2 border-amber-400/40 overflow-x-auto">
              <p className="text-xs uppercase tracking-wider text-rose-200 font-bold mb-2">
                Persamaan Ilmiah Utama:
              </p>
              <div className="py-2 text-amber-200 font-serif">
                <MathView math={item.formulaLatex} block className="text-xl sm:text-2xl" />
              </div>
            </div>

            {/* Grid of Variables & Usage Condition */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Variables Table */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-rose-800" />
                  <span>Daftar Besaran & Satuan SI</span>
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500">
                        <th className="py-1 px-2 font-semibold">Simbol</th>
                        <th className="py-1 px-2 font-semibold">Nama Besaran</th>
                        <th className="py-1 px-2 font-semibold">Satuan SI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {item.variables.map((v, i) => (
                        <tr key={i} className="hover:bg-white/60">
                          <td className="py-1.5 px-2 font-bold text-rose-900 font-serif">
                            <MathView math={v.symbol} />
                          </td>
                          <td className="py-1.5 px-2 text-slate-800 font-medium">{v.name}</td>
                          <td className="py-1.5 px-2 font-mono text-slate-600">{v.unit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Usage Conditions */}
              <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-200/80 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                  <span>Kondisi & Batasan Penggunaan</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {item.usageCondition}
                </p>

                <h5 className="text-xs font-bold text-slate-800 pt-2">Hubungan Antarvariabel:</h5>
                <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                  {item.variableRelationships.map((rel, idx) => (
                    <li key={idx}>{rel}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Example Calculation & Common Traps */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              {/* Example Numerical Substitution */}
              <div className="bg-amber-50/60 rounded-2xl p-4 border border-amber-200/80 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-amber-700" />
                  <span>Contoh Substitusi Angka Singkat</span>
                </h4>
                <p className="text-xs font-medium text-slate-800 italic">
                  "{item.exampleCalculation.problem}"
                </p>
                <div className="bg-white/80 p-3 rounded-xl border border-amber-200 space-y-1 text-xs">
                  <p>
                    <strong>Diketahui:</strong> {item.exampleCalculation.given}
                  </p>
                  <p>
                    <strong>Substitusi:</strong> {item.exampleCalculation.substitution}
                  </p>
                  <p className="font-bold text-rose-900">
                    <strong>Hasil:</strong> {item.exampleCalculation.result}
                  </p>
                </div>
              </div>

              {/* Common Pitfalls / Mistakes */}
              <div className="bg-rose-50/60 rounded-2xl p-4 border border-rose-200/80 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-950 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-700" />
                  <span>Jebakan & Kesalahan Umum Siswa</span>
                </h4>
                <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                  {item.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {mistake}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
