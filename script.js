import StorageService from './modules/StorageService.js';
import MCQQuestion from './modules/MCQQuestion.js';
import TrueFalseQuestion from './modules/TrueFalseQuestion.js';
import Quiz from './modules/Quiz.js';

const saveHint  = document.getElementById('saveHint');
const resultsEl = document.getElementById('results');
const resetBtn  = document.getElementById('resetBtn');
const submitBtn = document.getElementById('submitBtn');
const qEls      = Array.from(document.querySelectorAll('.q'));

const storage = new StorageService();
const questions = qEls.map(el =>
  el.dataset.type === 'tf' ? new TrueFalseQuestion(el) : new MCQQuestion(el)
);
const quiz = new Quiz(questions, storage, 70);
quiz.restoreSelections();
quiz.wireSaving(saveHint);

let isSubmitted = false;

resetBtn.addEventListener('click', () => {
  storage.clear();
  resultsEl.textContent = '';
  isSubmitted = false;
  for (const q of questions) {
    const checked = q.root.querySelector('input[type="radio"]:checked');
    if (checked) checked.checked = false;
    q.root.style.outline = '';
    q.root.querySelectorAll('input[type="radio"]').forEach(opt => {
      opt.disabled = false;
      opt.parentElement.classList.remove('correct', 'incorrect');
    });
  }
});

submitBtn.addEventListener('click', () => {
  if (isSubmitted) {
    resultsEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    return;
  }
  const firstUnanswered = questions.find(q => q.getSelected() === null);
  if (firstUnanswered) {
    resultsEl.innerHTML = `<span class="fail"> Please answer all questions before submitting.</span>`;
    firstUnanswered.root.scrollIntoView({ behavior: 'smooth', block: 'center' });
    firstUnanswered.root.style.outline = '2px solid #dc2626';
    setTimeout(() => (firstUnanswered.root.style.outline = ''), 1000);
    resultsEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    return;
  }
  const r = quiz.grade();
  resultsEl.innerHTML =
    `Score: ${r.score}/${r.total} — ${r.pct}% ` +
    `<span class="${r.passed ? 'pass' : 'fail'}">${r.passed ? 'PASS' : 'FAIL'}</span>`;

  for (const q of questions) {
    const selected = q.getSelected();
    const radios = q.root.querySelectorAll('input[type="radio"]');
    radios.forEach((opt, idx) => {
      const lab = opt.parentElement;
      lab.classList.remove('correct', 'incorrect');
      if (selected !== null) {
        if (idx === q.correctIndex) lab.classList.add('correct');
        else if (idx === selected)  lab.classList.add('incorrect');
      }
      opt.disabled = true;
    });
  }
  storage.clear();
  isSubmitted = true;
  resultsEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
