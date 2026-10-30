import React, { useState } from 'react';
import { GraduationCap, Search, Filter, BookOpen, Zap, Volume2, CheckCircle2 } from 'lucide-react';
import { Question } from '../types';
import { MathView } from './MathView';
import { ScientificDiagram } from './ScientificDiagram';
import { misterJoTTS } from '../utils/tts';
import { MisterJoNarrator } from './MisterJoNarrator';
import { TextbookSolution } from './TextbookSolution';

interface ExplanationsDirectoryViewProps {
  questions: Question[];
  onSelectQuestion: (id: number) => void;
}

export const ExplanationsDirectoryView: React.FC<ExplanationsDirectoryViewProps> = ({
  questions,
  onSelectQuestion,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [strategyTab, setStrategyTab] = useState<'normal' | 'cepat'>('normal');

  const narrationText =
    'Ini adalah direktori pembahasan lengkap tiga puluh soal Fluida Dinamis. Di sini kamu dapat menelaah setiap soal secara mendalam dengan metode normal sepuluh langkah dan taktik cara cepat Mister Jo.';

  const filtered = questions.filter((q) => {
    const matchesTopic = selectedTopic === 'all' || q.topicId === selectedTopic;
    const cleanQuery = searchQuery.trim().toLowerCase();
    const matchesSearch =
      cleanQuery === '' ||
      q.id.toString() === cleanQuery ||
      `soal ${q.id}`.includes(cleanQuery) ||
      `#${q.id}`.includes(cleanQuery) ||
      q.title.toLowerCase().includes(cleanQuery) ||
      q.questionText.toLowerCase().includes(cleanQuery) ||
      q.topicName.toLowerCase().includes(cleanQuery);
    return matchesTopic && matchesSearch;
  });

  const handleSpeakNormal = (q: Question) => {
    misterJoTTS.speak(q.narratorNarration.normalExplanation);
  };

  const handleSpeakFast = (q: Question) => {
    misterJoTTS.speak(q.narratorNarration.fastStrategy);
  };

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-900 text-amber-300 flex items-center justify-center font-bold text-xl">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-rose-950">
              Direktori Pembahasan 30 Soal
            </h2>
            <p className="text-slate-600 text-sm">
              Analisis komprehensif cara normal, strategi cara cepat, dan evaluasi jebakan TKA
            </p>
          </div>
        </div>

        <MisterJoNarrator
          currentText={narrationText}
          contextLabel="Bimbingan Direktori Pembahasan oleh Mister Jo"
        />

        {/* Filter Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nomor soal, fenomena, atau konsep..."
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

      {/* Accordion / List of 30 Solutions */}
      <div className="space-y-4">
        {filtered.map((q) => {
          const isExpanded = expandedId === q.id;

          return (
            <div
              key={q.id}
              className="bg-white rounded-3xl border border-rose-100 shadow-sm overflow-hidden transition-all"
            >
              {/* Question Header Bar */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
                className="p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-900 text-amber-300 font-extrabold text-base flex items-center justify-center shrink-0">
                    {q.id}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                        {q.topicName}
                      </span>
                      <span className="text-xs font-semibold text-slate-600">
                        {q.type === 'pg'
                          ? 'Pilihan Ganda'
                          : q.type === 'pgk'
                          ? 'PG Kompleks'
                          : 'Benar-Salah'}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">{q.title}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-rose-800 hidden sm:inline">
                    {isExpanded ? 'Tutup Kajian' : 'Buka Kajian'}
                  </span>
                </div>
              </div>

              {/* Expanded Detailed 10-Point Explanation */}
              {isExpanded && (
                <div className="p-6 sm:p-8 border-t border-slate-100 space-y-6 bg-slate-50/30">
                  {/* Stem snippet */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 text-slate-800 text-sm font-semibold">
                    <p className="text-xs uppercase text-slate-400 font-bold mb-1">Stimulus & Soal:</p>
                    <MathView text={q.questionText} />
                  </div>

                  {/* Diagram */}
                  {q.stimulus.diagramType && (
                    <ScientificDiagram
                      type={q.stimulus.diagramType}
                      caption={q.stimulus.caption}
                    />
                  )}

                  {/* Full Textbook Solution Component */}
                  <TextbookSolution
                    question={q}
                    activeStrategyTab={strategyTab}
                    onTabChange={setStrategyTab}
                    onSpeakNormal={() => handleSpeakNormal(q)}
                    onSpeakFast={() => handleSpeakFast(q)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
