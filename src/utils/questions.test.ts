import test from 'node:test';
import assert from 'node:assert/strict';
import { QUESTIONS_DATA } from '../data/questions';

test('Questions count must be exactly 30', () => {
  assert.equal(QUESTIONS_DATA.length, 30);
});

test('Question types must be exactly 10 PG, 10 PGK, and 10 BS', () => {
  const pgCount = QUESTIONS_DATA.filter((q) => q.type === 'pg').length;
  const pgkCount = QUESTIONS_DATA.filter((q) => q.type === 'pgk').length;
  const bsCount = QUESTIONS_DATA.filter((q) => q.type === 'bs').length;

  assert.equal(pgCount, 10, 'Expected exactly 10 PG questions');
  assert.equal(pgkCount, 10, 'Expected exactly 10 PGK questions');
  assert.equal(bsCount, 10, 'Expected exactly 10 BS questions');
});

test('Topics must match required distribution', () => {
  const topicCounts: Record<string, number> = {};
  QUESTIONS_DATA.forEach((q) => {
    topicCounts[q.topicId] = (topicCounts[q.topicId] || 0) + 1;
  });

  assert.equal(topicCounts['sifat_fluida'], 4);
  assert.equal(topicCounts['debit'], 4);
  assert.equal(topicCounts['bernoulli_pipa'], 4);
  assert.equal(topicCounts['kontinuitas'], 4);
  assert.equal(topicCounts['venturi_tertutup'], 4);
  assert.equal(topicCounts['venturi_terbuka'], 4);
  assert.equal(topicCounts['tabung_pitot'], 3);
  assert.equal(topicCounts['gaya_angkat'], 3);
});

test('Every question has complete explanation fields and narrator scripts', () => {
  QUESTIONS_DATA.forEach((q) => {
    assert.ok(q.id >= 1 && q.id <= 30);
    assert.ok(q.title.length > 5);
    assert.ok(q.stimulus.text.length > 20);
    assert.ok(q.questionText.length > 10);

    // Check explanation fields
    const exp = q.explanation;
    assert.ok(exp.konsep.length > 5, `Q${q.id} missing konsep`);
    assert.ok(exp.diketahui.length > 0, `Q${q.id} missing diketahui`);
    assert.ok(exp.ditanya.length > 5, `Q${q.id} missing ditanya`);
    assert.ok(exp.rumus.length > 5, `Q${q.id} missing rumus`);
    assert.ok(exp.analisis.length > 10, `Q${q.id} missing analisis`);
    assert.ok(exp.penyelesaian.length > 10, `Q${q.id} missing penyelesaian`);
    assert.ok(exp.hasilAkhir.length > 5, `Q${q.id} missing hasilAkhir`);
    assert.ok(exp.caraCepat.length > 10, `Q${q.id} missing caraCepat`);
    assert.ok(exp.kesalahanUmum.length > 10, `Q${q.id} missing kesalahanUmum`);
    assert.ok(exp.kesimpulan.length > 10, `Q${q.id} missing kesimpulan`);

    // Check narrator fields
    const narr = q.narratorNarration;
    assert.ok(narr.stimulus.length > 10, `Q${q.id} missing narrator stimulus`);
    assert.ok(narr.question.length > 10, `Q${q.id} missing narrator question`);
    assert.ok(narr.guidance.length > 10, `Q${q.id} missing narrator guidance`);
    assert.ok(narr.normalExplanation.length > 10, `Q${q.id} missing narrator normalExplanation`);
    assert.ok(narr.fastStrategy.length > 10, `Q${q.id} missing narrator fastStrategy`);
    assert.ok(narr.feedbackCorrect.length > 10, `Q${q.id} missing narrator feedbackCorrect`);
    assert.ok(narr.feedbackIncorrect.length > 10, `Q${q.id} missing narrator feedbackIncorrect`);
  });
});
