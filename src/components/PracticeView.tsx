import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Volume2,
  Sparkles,
  Zap,
  RotateCcw,
  AlertCircle,
  Layers,
  Award,
} from 'lucide-react';
import { Question, UserProgress } from '../types';
import { evaluateAnswer } from '../utils/scoring';
import { MathView } from './MathView';
import { ScientificDiagram } from './ScientificDiagram';
import { misterJoTTS } from '../utils/tts';
import { MisterJoNarrator } from './MisterJoNarrator';
import { TextbookSolution } from './TextbookSolution';

interface PracticeViewProps {
  questions: Question[];
  progress: UserProgress;
  onUpdateAnswer: (questionId: number, answer: any) => void;
  onToggleFlag: (questionId: number) => void;
  onCheckAnswer: (questionId: number) => void;
  onNavigateQuestion: (questionId: number) => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  questions,
  progress,
  onUpdateAnswer,
  onToggleFlag,
  onCheckAnswer,
  onNavigateQuestion,
}) => {
  const currentQId = progress.currentQuestionId || 1;
  const currentQ = questions.find((q) => q.id === currentQId) || questions[0];

  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [activeStrategyTab, setActiveStrategyTab] = useState<'normal' | 'cepat'>('normal');

  // When changing question, stop speech and reset explanation toggle
  useEffect(() => {
    setShowExplanation(progress.checked[currentQ.id] || false);
    misterJoTTS.stop();
  }, [currentQ.id, progress.checked]);

  const userAnswer = progress.answers[currentQ.id];
  const isChecked = progress.checked[currentQ.id] || false;
  const isFlagged = progress.flagged[currentQ.id] || false;
  const isCorrect = progress.isCorrect[currentQ.id] || false;

  // Handle PG selection
  const handleSelectPGOption = (key: string) => {
    if (isChecked) return; // locked once checked
    onUpdateAnswer(currentQ.id, key);
  };

  // Handle PGK multiple selection
  const handleTogglePGKOption = (id: string) => {
    if (isChecked) return;
    const currentList: string[] = Array.isArray(userAnswer) ? [...userAnswer] : [];
    const exists = currentList.includes(id);
    let updated: string[];
    if (exists) {
      updated = currentList.filter((item) => item !== id);
    } else {
      updated = [...currentList, id];
    }
    onUpdateAnswer(currentQ.id, updated);
  };

  // Handle BS statement selection
  const handleSelectBSStatement = (statementId: string, value: boolean) => {
    if (isChecked) return;
    const currentMap = typeof userAnswer === 'object' && userAnswer !== null ? { ...userAnswer } : {};
    currentMap[statementId] = value;
    onUpdateAnswer(currentQ.id, currentMap);
  };

  // Check Answer Handler
  const handleVerify = () => {
    if (!userAnswer && userAnswer !== false) {
      misterJoTTS.speak('Silakan pilih jawaban Anda terlebih dahulu sebelum memeriksa.');
      return;
    }

    onCheckAnswer(currentQ.id);
    setShowExplanation(true);

    const correct = evaluateAnswer(currentQ, userAnswer);
    if (correct) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
      misterJoTTS.speak(currentQ.narratorNarration.feedbackCorrect);
    } else {
      misterJoTTS.speak(currentQ.narratorNarration.feedbackIncorrect);
    }
  };

  const handleSpeakStimulus = () => {
    misterJoTTS.speak(currentQ.narratorNarration.stimulus);
  };

  const handleSpeakQuestion = () => {
    misterJoTTS.speak(currentQ.narratorNarration.question);
  };

  const handleSpeakGuidance = () => {
    misterJoTTS.speak(currentQ.narratorNarration.guidance);
  };

  const handleSpeakNormalExp = () => {
    misterJoTTS.speak(currentQ.narratorNarration.normalExplanation);
  };

  const handleSpeakFastStrategy = () => {
    misterJoTTS.speak(currentQ.narratorNarration.fastStrategy);
  };

  // Previous and Next Navigation
  const handlePrev = () => {
    if (currentQ.id > 1) {
      onNavigateQuestion(currentQ.id - 1);
    }
  };

  const handleNext = () => {
    if (currentQ.id < 30) {
      onNavigateQuestion(currentQ.id + 1);
    }
  };

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      {/* Top Controller Bar: Question Number & Palette Drawer */}
      <div className="bg-white rounded-2xl p-4 border border-rose-100 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-950 text-amber-300 font-black text-lg flex items-center justify-center border border-amber-400/40">
            {currentQ.id}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                {currentQ.topicName}
              </span>
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                {currentQ.type === 'pg'
                  ? 'Pilihan Ganda'
                  : currentQ.type === 'pgk'
                  ? 'Pilihan Ganda Kompleks'
                  : 'Benar atau Salah'}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
              {currentQ.title}
            </h2>
          </div>
        </div>

        {/* Flag button & Nav controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleFlag(currentQ.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold border transition ${
              isFlagged
                ? 'bg-amber-100 border-amber-400 text-amber-900'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isFlagged ? 'fill-amber-500 text-amber-600' : ''}`} />
            <span>{isFlagged ? 'Ditandai Ragu' : 'Tandai Ragu'}</span>
          </button>

          <button
            onClick={handlePrev}
            disabled={currentQ.id === 1}
            className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none"
            title="Soal Sebelumnya"
            aria-label="Soal Sebelumnya"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-xs font-bold text-slate-600 px-1">
            {currentQ.id} / 30
          </span>

          <button
            onClick={handleNext}
            disabled={currentQ.id === 30}
            className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none"
            title="Soal Berikutnya"
            aria-label="Soal Berikutnya"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Question Content & Number Palette */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): Stimulus, Stem, Options, Explanations */}
        <div className="lg:col-span-8 space-y-6">
          {/* Stimulus Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <span className="text-xs font-extrabold uppercase tracking-wider text-rose-900 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                Stimulus Konseptual • {currentQ.stimulus.contextTitle}
              </span>
              <button
                onClick={handleSpeakStimulus}
                className="flex items-center gap-1.5 text-xs font-bold text-rose-800 hover:text-rose-950 bg-rose-100/60 px-3 py-1 rounded-full transition"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Dengar Wacana</span>
              </button>
            </div>

            {/* Stimulus Text */}
            <div className="text-slate-800 text-sm sm:text-base leading-relaxed space-y-2">
              <MathView text={currentQ.stimulus.text} />
            </div>

            {/* Stimulus Scientific Diagram */}
            {currentQ.stimulus.diagramType && (
              <ScientificDiagram
                type={currentQ.stimulus.diagramType}
                caption={currentQ.stimulus.caption}
              />
            )}

            {/* Optional Data Table */}
            {currentQ.stimulus.tableData && (
              <div className="my-3 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50/50 p-2">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-700">
                      {currentQ.stimulus.tableData.headers.map((h, i) => (
                        <th key={i} className="py-2 px-3 font-bold bg-slate-100/80">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {currentQ.stimulus.tableData.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-white">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="py-2 px-3 text-slate-800">
                            <MathView text={String(cell)} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Question Stem Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
              <h3 className="text-base sm:text-lg font-black text-rose-950 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-rose-900 text-amber-300 text-xs font-bold flex items-center justify-center">
                  Q
                </span>
                <span>Pertanyaan Penyelidikan Fisis:</span>
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSpeakQuestion}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 px-2.5 py-1 rounded-full transition"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Dengar Soal</span>
                </button>
                <button
                  onClick={handleSpeakGuidance}
                  className="flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-full transition"
                  title="Minta Petunjuk Berpikir Mister Jo"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Arahan Berpikir</span>
                </button>
              </div>
            </div>

            <div className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              <MathView text={currentQ.questionText} />
            </div>

            {/* Answer Interaction Area */}
            <div className="pt-2">
              {/* --- TYPE 1: PILIHAN GANDA (PG) --- */}
              {currentQ.type === 'pg' && currentQ.pgOptions && (
                <div className="space-y-3">
                  {currentQ.pgOptions.map((opt) => {
                    const isSelected = userAnswer === opt.key;
                    const isOptCorrect = isChecked && opt.key === currentQ.correctAnswer;
                    const isOptWrong = isChecked && isSelected && !isOptCorrect;

                    let optBg = 'bg-slate-50 hover:bg-slate-100 border-slate-200';
                    if (isSelected) {
                      optBg = 'bg-rose-50 border-rose-800 ring-2 ring-rose-800/30';
                    }
                    if (isChecked) {
                      if (isOptCorrect) {
                        optBg = 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/40';
                      } else if (isOptWrong) {
                        optBg = 'bg-rose-50 border-rose-500 ring-2 ring-rose-500/40';
                      }
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectPGOption(opt.key)}
                        disabled={isChecked}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${optBg}`}
                      >
                        <span
                          className={`w-9 h-9 rounded-xl font-black text-sm flex items-center justify-center shrink-0 shadow-sm ${
                            isSelected
                              ? 'bg-rose-900 text-amber-300'
                              : 'bg-white border border-slate-300 text-slate-700'
                          }`}
                        >
                          {opt.key}
                        </span>
                        <div className="flex-1 text-sm sm:text-base font-semibold text-slate-800">
                          <MathView text={opt.text} />
                        </div>
                        {isChecked && isOptCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        )}
                        {isChecked && isOptWrong && (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* --- TYPE 2: PILIHAN GANDA KOMPLEKS (PGK) --- */}
              {currentQ.type === 'pgk' && currentQ.pgkOptions && (
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-slate-500 italic mb-2">
                    *Pilihlah semua pernyataan yang benar. Jawaban benar jika seluruh pilihan Anda tepat.
                  </p>
                  {currentQ.pgkOptions.map((opt) => {
                    const isSelected = Array.isArray(userAnswer) && userAnswer.includes(opt.id);
                    const shouldBeChecked = opt.isCorrect;

                    let optStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200';
                    if (isSelected) {
                      optStyle = 'bg-rose-50 border-rose-800 ring-2 ring-rose-800/30';
                    }
                    if (isChecked) {
                      if (isSelected && shouldBeChecked) {
                        optStyle = 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/40';
                      } else if (isSelected && !shouldBeChecked) {
                        optStyle = 'bg-rose-50 border-rose-500 ring-2 ring-rose-500/40';
                      } else if (!isSelected && shouldBeChecked) {
                        optStyle = 'bg-amber-50 border-amber-500 border-dashed';
                      }
                    }

                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleTogglePGKOption(opt.id)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${optStyle}`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            disabled={isChecked}
                            onChange={() => {}}
                            className="mt-1 w-5 h-5 rounded text-rose-800 focus:ring-rose-800 cursor-pointer"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-rose-900 text-sm">
                                Opsi {opt.id}:
                              </span>
                              <span className="text-sm sm:text-base font-semibold text-slate-800">
                                <MathView text={opt.text} />
                              </span>
                            </div>
                            {isChecked && (
                              <p className="mt-1.5 text-xs text-slate-600 font-medium">
                                <span className={opt.isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                                  {opt.isCorrect ? '✓ Pernyataan Benar' : '✗ Pernyataan Salah'}:
                                </span>{' '}
                                <MathView text={opt.reason} />
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* --- TYPE 3: BENAR ATAU SALAH (BS) --- */}
              {currentQ.type === 'bs' && currentQ.bsStatements && (
                <div className="space-y-4">
                  <p className="text-xs font-semibold text-slate-500 italic mb-2">
                    *Tentukan status BENAR atau SALAH untuk setiap pernyataan berikut:
                  </p>
                  {currentQ.bsStatements.map((st, sIdx) => {
                    const statementVal = userAnswer?.[st.id];
                    const isSelectedTrue = statementVal === true;
                    const isSelectedFalse = statementVal === false;
                    const isStatementEvaluated = isChecked;
                    const isAnswerCorrect = isStatementEvaluated && statementVal === st.isTrue;

                    return (
                      <div
                        key={st.id}
                        className={`p-4 rounded-2xl border-2 transition-all ${
                          isStatementEvaluated
                            ? isAnswerCorrect
                              ? 'bg-emerald-50/70 border-emerald-500'
                              : 'bg-rose-50/70 border-rose-500'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex-1">
                            <span className="text-xs font-bold text-rose-900 bg-rose-100/70 px-2 py-0.5 rounded mr-2">
                              Pernyataan #{sIdx + 1}
                            </span>
                            <span className="text-sm sm:text-base font-semibold text-slate-900">
                              <MathView text={st.statement} />
                            </span>
                          </div>

                          {/* Benar / Salah Toggle Buttons */}
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleSelectBSStatement(st.id, true)}
                              disabled={isChecked}
                              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition ${
                                isSelectedTrue
                                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                              }`}
                            >
                              BENAR
                            </button>
                            <button
                              onClick={() => handleSelectBSStatement(st.id, false)}
                              disabled={isChecked}
                              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition ${
                                isSelectedFalse
                                  ? 'bg-rose-700 text-white border-rose-800 shadow-sm'
                                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                              }`}
                            >
                              SALAH
                            </button>
                          </div>
                        </div>

                        {isChecked && (
                          <div className="mt-2.5 pt-2 border-t border-slate-200/80 text-xs text-slate-700">
                            <span className={st.isTrue ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
                              Kunci: {st.isTrue ? 'BENAR' : 'SALAH'}
                            </span>{' '}
                            — <MathView text={st.reason} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bottom Actions: Verify & Toggle Explanation */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                {!isChecked ? (
                  <button
                    onClick={handleVerify}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-900 to-rose-800 hover:from-rose-850 hover:to-rose-750 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-md transition transform active:scale-95"
                  >
                    <CheckCircle2 className="w-5 h-5 text-amber-300" />
                    <span>Periksa Jawaban</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-4 py-2 rounded-xl text-sm font-black flex items-center gap-1.5 ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                    >
                      {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      <span>{isCorrect ? 'Jawaban Anda Tepat!' : 'Belum Tepat'}</span>
                    </span>
                  </div>
                )}

                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="flex items-center gap-1.5 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-2xl border border-slate-300/80 transition"
                >
                  <BookOpen className="w-4 h-4 text-rose-800" />
                  <span>{showExplanation ? 'Sembunyikan Pembahasan' : 'Buka Pembahasan'}</span>
                </button>
              </div>

              {/* Prev & Next */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  disabled={currentQ.id === 1}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none"
                >
                  Sebelumnya
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentQ.id === 30}
                  className="px-5 py-2.5 rounded-xl bg-rose-950 text-amber-300 font-extrabold text-xs sm:text-sm hover:bg-rose-900 disabled:opacity-30 disabled:pointer-events-none"
                >
                  Berikutnya
                </button>
              </div>
            </div>
          </div>

          {/* Textbook Mathematical Solution & 10-Point Analysis */}
          {showExplanation && (
            <TextbookSolution
              question={currentQ}
              activeStrategyTab={activeStrategyTab}
              onTabChange={setActiveStrategyTab}
              onSpeakNormal={handleSpeakNormalExp}
              onSpeakFast={handleSpeakFastStrategy}
            />
          )}
        </div>

        {/* Right Column (4 cols): Number Palette & Progress Card */}
        <div className="lg:col-span-4 space-y-6">
          {/* Palette Card */}
          <div className="bg-white rounded-3xl p-5 border border-rose-100 shadow-sm space-y-4 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                <Layers className="w-4 h-4 text-rose-800" />
                <span>Palet Navigasi 30 Soal</span>
              </h3>
              <span className="text-xs font-bold text-rose-800">
                {Object.keys(progress.answers).length} / 30
              </span>
            </div>

            {/* Grid of 30 questions */}
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q) => {
                const isCurrent = q.id === currentQ.id;
                const isAnswered = progress.answers[q.id] !== undefined;
                const isCheckedQ = progress.checked[q.id];
                const isCorrectQ = progress.isCorrect[q.id];
                const isFlaggedQ = progress.flagged[q.id];

                let btnStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';
                if (isCurrent) {
                  btnStyle = 'ring-2 ring-rose-900 bg-rose-900 text-amber-300 font-black';
                } else if (isCheckedQ) {
                  btnStyle = isCorrectQ
                    ? 'bg-emerald-600 text-white font-bold border-emerald-700'
                    : 'bg-rose-700 text-white font-bold border-rose-800';
                } else if (isAnswered) {
                  btnStyle = 'bg-rose-100 text-rose-950 border-rose-300 font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => onNavigateQuestion(q.id)}
                    className={`relative h-11 rounded-xl text-xs font-extrabold border flex items-center justify-center transition-all ${btnStyle}`}
                  >
                    <span>{q.id}</span>
                    {isFlaggedQ && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-white" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-600 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-rose-900 ring-1 ring-amber-400" />
                <span>Soal Aktif</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-rose-100 border border-rose-300" />
                <span>Sudah Dijawab</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-600" />
                <span>Jawaban Benar</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-rose-700" />
                <span>Jawaban Salah</span>
              </div>
              <div className="flex items-center gap-1.5 col-span-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Titik Emas: Ditandai Ragu-Ragu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
