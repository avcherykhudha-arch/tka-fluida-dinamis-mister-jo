import { Question, UserProgress, TopicSummary, TopicId } from '../types';

export function evaluateAnswer(question: Question, userAnswer: any): boolean {
  if (userAnswer === undefined || userAnswer === null) return false;

  if (question.type === 'pg') {
    return String(userAnswer).trim().toUpperCase() === String(question.correctAnswer).trim().toUpperCase();
  }

  if (question.type === 'pgk') {
    if (!Array.isArray(userAnswer)) return false;
    const correctList = Array.isArray(question.correctAnswer)
      ? [...(question.correctAnswer as string[])].sort()
      : [];
    const userList = [...userAnswer].map(String).sort();

    if (correctList.length !== userList.length) return false;
    return correctList.every((val, idx) => val === userList[idx]);
  }

  if (question.type === 'bs') {
    if (typeof userAnswer !== 'object' || userAnswer === null) return false;
    const statements = question.bsStatements || [];
    if (statements.length === 0) return false;

    return statements.every((st) => {
      return userAnswer[st.id] === st.isTrue;
    });
  }

  return false;
}

export function calculateGradePredicate(scorePercentage: number): {
  predicate: string;
  badgeColor: string;
  description: string;
} {
  const rounded = Math.round(scorePercentage);
  if (rounded >= 90) {
    return {
      predicate: 'Master Fisika',
      badgeColor: 'bg-emerald-600 text-white',
      description: 'Luar biasa! Pemahaman konsep dan penalaran matematis fluida dinamis Anda sangat matang.',
    };
  }
  if (rounded >= 80) {
    return {
      predicate: 'Sangat Baik',
      badgeColor: 'bg-blue-600 text-white',
      description: 'Kemampuan analisis Anda sudah sangat kuat. Pertahankan ketelitian perhitungan numerik.',
    };
  }
  if (rounded >= 70) {
    return {
      predicate: 'Berkembang',
      badgeColor: 'bg-amber-600 text-white',
      description: 'Konsep dasar sudah dipahami, namun perlu lebih teliti pada penurunan rumus dan variasi soal.',
    };
  }
  if (rounded >= 60) {
    return {
      predicate: 'Perlu Penguatan',
      badgeColor: 'bg-orange-600 text-white',
      description: 'Perlu penguatan konsep dasar Bernoulli, kontinuitas, dan konversi satuan SI.',
    };
  }
  return {
    predicate: 'Ayo Belajar Lagi',
    badgeColor: 'bg-rose-700 text-white',
    description: 'Jangan patah semangat! Pelajari kembali Bank Rumus dan ikuti bimbingan Mister Jo langkah demi langkah.',
  };
}

export function computeTopicSummaries(questions: Question[], progress: UserProgress): TopicSummary[] {
  const map: Record<TopicId, { name: string; total: number; completed: number; correct: number }> = {
    sifat_fluida: { name: 'Sifat Fluida Dinamis', total: 0, completed: 0, correct: 0 },
    debit: { name: 'Konsep Debit', total: 0, completed: 0, correct: 0 },
    bernoulli_pipa: { name: 'Bernoulli Pipa Beda Ketinggian', total: 0, completed: 0, correct: 0 },
    kontinuitas: { name: 'Asas Kontinuitas', total: 0, completed: 0, correct: 0 },
    venturi_tertutup: { name: 'Venturimeter Tertutup', total: 0, completed: 0, correct: 0 },
    venturi_terbuka: { name: 'Venturimeter Terbuka', total: 0, completed: 0, correct: 0 },
    tabung_pitot: { name: 'Tabung Pitot', total: 0, completed: 0, correct: 0 },
    gaya_angkat: { name: 'Gaya Angkat Pesawat', total: 0, completed: 0, correct: 0 },
  };

  questions.forEach((q) => {
    if (!map[q.topicId]) {
      map[q.topicId] = { name: q.topicName, total: 0, completed: 0, correct: 0 };
    }
    map[q.topicId].total += 1;

    const answer = progress.answers[q.id];
    if (answer !== undefined && answer !== null) {
      if (q.type === 'pgk' && Array.isArray(answer) && answer.length > 0) {
        map[q.topicId].completed += 1;
      } else if (q.type === 'bs' && Object.keys(answer).length === (q.bsStatements?.length || 3)) {
        map[q.topicId].completed += 1;
      } else if (q.type === 'pg' && answer !== '') {
        map[q.topicId].completed += 1;
      }
    }

    if (progress.checked[q.id] && progress.isCorrect[q.id]) {
      map[q.topicId].correct += 1;
    }
  });

  return (Object.keys(map) as TopicId[]).map((topicId) => {
    const item = map[topicId];
    const accuracy = item.completed > 0 ? Math.round((item.correct / item.completed) * 100) : 0;
    return {
      id: topicId,
      name: item.name,
      total: item.total,
      completed: item.completed,
      correct: item.correct,
      accuracy,
    };
  });
}
