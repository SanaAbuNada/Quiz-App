export default class StorageService {
  #key;
  constructor(key = 'quiz.answers.v1') { 
    this.#key = key;
  }
  load() {
    try {
      const raw = localStorage.getItem(this.#key); 
      return raw ? JSON.parse(raw) : {}; 
    } catch { 
      return {};
    } 
  }
  save(obj) {
     try { 
      localStorage.setItem(this.#key, JSON.stringify(obj)); 
    } catch {

    } 
  }
  clear() { 
    localStorage.removeItem(this.#key); 
  }
}
