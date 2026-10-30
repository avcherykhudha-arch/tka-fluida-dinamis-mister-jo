export type QuestionType = 'pg' | 'pgk' | 'bs';

export type TopicId =
  | 'sifat_fluida'
  | 'debit'
  | 'bernoulli_pipa'
  | 'kontinuitas'
  | 'venturi_tertutup'
  | 'venturi_terbuka'
  | 'tabung_pitot'
  | 'gaya_angkat';

export interface PGOption {
  key: string; // 'A', 'B', 'C', 'D', 'E'
  text: string;
  math?: string;
}

export interface PGKOption {
  id: string; // 'A', 'B', 'C', 'D', 'E'
  text: string;
  isCorrect: boolean;
  reason: string;
}

export interface BSStatement {
  id: string; // 'S1', 'S2', 'S3'
  statement: string;
  isTrue: boolean;
  reason: string;
}

export interface QuestionExplanation {
  konsep: string;
  diketahui: string[];
  ditanya: string;
  rumus: string;
  analisis: string;
  penyelesaian: string;
  hasilAkhir: string;
  caraCepat: string;
  kesalahanUmum: string;
  kesimpulan: string;
  perbandinganStrategi: string;
}

export interface NarratorNarration {
  stimulus: string;
  question: string;
  guidance: string;
  normalExplanation: string;
  fastStrategy: string;
  feedbackCorrect: string;
  feedbackIncorrect: string;
}

export interface TableData {
  headers: string[];
  rows: (string | number)[][];
}

export interface Question {
  id: number; // 1 to 30
  title: string;
  topicId: TopicId;
  topicName: string;
  type: QuestionType;
  stimulus: {
    contextTitle: string;
    text: string;
    tableData?: TableData;
    diagramType: string;
    caption?: string;
  };
  questionText: string;
  pgOptions?: PGOption[];
  pgkOptions?: PGKOption[];
  bsStatements?: BSStatement[];
  correctAnswer: string | string[] | Record<string, boolean>;
  explanation: QuestionExplanation;
  narratorNarration: NarratorNarration;
}

export interface UserProgress {
  answers: Record<number, any>; // PG: 'A', PGK: ['A', 'C'], BS: {'S1': true, 'S2': false, 'S3': true}
  flagged: Record<number, boolean>;
  checked: Record<number, boolean>;
  isCorrect: Record<number, boolean>;
  startedAt: number;
  lastUpdated: number;
  currentQuestionId: number;
}

export interface TopicSummary {
  id: TopicId;
  name: string;
  total: number;
  completed: number;
  correct: number;
  accuracy: number;
}

export interface FormulaItem {
  id: string;
  topicId: TopicId;
  topicName: string;
  title: string;
  formulaLatex: string;
  variables: { symbol: string; name: string; unit: string }[];
  usageCondition: string;
  variableRelationships: string[];
  exampleCalculation: {
    problem: string;
    given: string;
    substitution: string;
    result: string;
  };
  commonMistakes: string[];
}
