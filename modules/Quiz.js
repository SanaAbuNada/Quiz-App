export default class Quiz {
  constructor(questions, storage, passPct = 70) {
    this.questions = questions;
    this.storage = storage;
    this.passPct = passPct;
    this.answers = this.storage.load();
  }
  restoreSelections() {
    for (const q of this.questions) {
      const saved = this.answers[q.id];
      if (saved !== undefined) q.setSelected(saved);
    }
  }
  wireSaving(saveHintEl) {
    for (const q of this.questions) {
      q.onChange((id, idx) => {
        this.answers[id] = idx;
        this.storage.save(this.answers);
        if (saveHintEl) { saveHintEl.textContent = 'Saved!'; setTimeout(() => saveHintEl.textContent = '', 800); }
      });
    }
  }
  grade() {
    let score = 0;
    for (const q of this.questions) {
      const ans = q.getSelected();
      if (ans !== null && q.isCorrect(ans)) score++;
    }
    const total = this.questions.length;
    const pct = Math.round((score / total) * 100);
    const passed = pct >= this.passPct;
    return { score, total, pct, passed };
  }
}
