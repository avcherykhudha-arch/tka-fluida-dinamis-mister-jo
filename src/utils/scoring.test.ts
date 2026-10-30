import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateAnswer, calculateGradePredicate, computeTopicSummaries } from './scoring';
import { Question, UserProgress } from '../types';

test('evaluateAnswer correctly evaluates Pilihan Ganda (PG)', () => {
  const dummyPG = {
    id: 1,
    type: 'pg',
    correctAnswer: 'B',
  } as unknown as Question;

  assert.equal(evaluateAnswer(dummyPG, 'B'), true);
  assert.equal(evaluateAnswer(dummyPG, 'b'), true);
  assert.equal(evaluateAnswer(dummyPG, 'A'), false);
  assert.equal(evaluateAnswer(dummyPG, null), false);
});

test('evaluateAnswer correctly evaluates Pilihan Ganda Kompleks (PGK)', () => {
  const dummyPGK = {
    id: 2,
    type: 'pgk',
    correctAnswer: ['A', 'C'],
  } as unknown as Question;

  // Exact match regardless of order
  assert.equal(evaluateAnswer(dummyPGK, ['A', 'C']), true);
  assert.equal(evaluateAnswer(dummyPGK, ['C', 'A']), true);
  // Missing one
  assert.equal(evaluateAnswer(dummyPGK, ['A']), false);
  // Extra one
  assert.equal(evaluateAnswer(dummyPGK, ['A', 'C', 'D']), false);
});

test('evaluateAnswer correctly evaluates Benar-Salah (BS)', () => {
  const dummyBS = {
    id: 3,
    type: 'bs',
    bsStatements: [
      { id: 'S1', isTrue: true },
      { id: 'S2', isTrue: false },
      { id: 'S3', isTrue: true },
    ],
  } as unknown as Question;

  assert.equal(
    evaluateAnswer(dummyBS, { S1: true, S2: false, S3: true }),
    true
  );
  assert.equal(
    evaluateAnswer(dummyBS, { S1: true, S2: true, S3: true }),
    false
  );
});

test('calculateGradePredicate returns correct bands and predicates', () => {
  assert.equal(calculateGradePredicate(95).predicate, 'Master Fisika');
  assert.equal(calculateGradePredicate(85).predicate, 'Sangat Baik');
  assert.equal(calculateGradePredicate(75).predicate, 'Berkembang');
  assert.equal(calculateGradePredicate(65).predicate, 'Perlu Penguatan');
  assert.equal(calculateGradePredicate(55).predicate, 'Ayo Belajar Lagi');
});
