export default class BaseQuestion {
  constructor(rootEl) {
    this.root = rootEl;
    this.id = rootEl.dataset.id;
    this.correctIndex = Number(rootEl.dataset.answer);
  }
  getSelected() {
    const el = this.root.querySelector('input[type="radio"]:checked');
    return el ? Number(el.value) : null;
  }
  setSelected(idx) {
    const input = this.root.querySelector(`[value="${idx}"]`);
    if (input) input.checked = true;
  }

  onChange(handler) {
    this.root.addEventListener('change', (e) => {
      if (e.target && e.target.matches('input[type="radio"]')) {
        handler(this.id, Number(e.target.value));
      }
    });
  }
  isCorrect(idx) {
    return idx === this.correctIndex;
  }
}
