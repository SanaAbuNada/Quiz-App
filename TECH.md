# Quiz App Technical Requirements

The app is a single-page quiz with multiple-choice and true/false questions.  
It allows the user to answer all questions, reset answers, and submit to see the final score with pass/fail feedback.  
The app uses **OOP (ES6 classes)**, **DOM manipulation**, and **localStorage** for temporary persistence.

---

## Folder Structure
- `index.html` - the main structure of the app (entry point)
- `style.css` - the css style of the app
- `script.js` - the logic and event handling of the app
- `modules/Quiz.js` - class handling grading, restoring answers, and saving
- `modules/StorageService.js` - class handling localStorage operations
- `modules/MCQQuestion.js` - class for multiple-choice questions
- `modules/TrueFalseQuestion.js` - class for true/false questions

---

## Requirements

### Questions
- At least **10 questions** (mix of multiple-choice and true/false). *
- Each question is represented as an HTML element with:
  - question text (`<h3>`)
  - options as radio buttons (`<input type="radio">`)
  - `data-id` (unique identifier) *
  - `data-type` (`mcq` or `tf`) *
  - `data-answer` (index of correct option) *

### UI Elements
- **Submit button**: finish the quiz and show score + pass/fail. *
- **Reset button**: clear all answers and results. *
- **Save hint** element: shows “Saved!” message when an answer is stored. *
- **Results** element: displays score and PASS/FAIL message. *

### Reset Behavior
- Clear all selected answers. *
- Clear results area. *
- Re-enable all options. *
- Remove styles (`correct`/`incorrect`). *
- Clear localStorage. *

### Submit Behavior
- Check if all questions are answered:
  - If not, show warning message in results area. *
  - Highlight the first unanswered question. *
- If all answered:
  - Calculate score, total, percentage, and pass/fail (pass ≥ 70%). *
  - Show score and result in results area. *
  - Mark correct answers (`.correct`) and incorrect selected answers (`.incorrect`). *
  - Disable all inputs. *
  - Clear localStorage to start fresh on next load. *

### LocalStorage
- Save selected answers immediately when user chooses an option. *
- Restore saved answers when page reloads (if quiz not yet submitted). *
- After submit/reset, clear storage so quiz starts fresh. *

---

## Classes
- **StorageService**
  - `load()`
  - `save(data)`
  - `clear()`
- **MCQQuestion**
  - Handles multiple-choice question logic. *
- **TrueFalseQuestion**
  - Handles true/false question logic. *
- **Quiz**
  - `restoreSelections()`
  - `wireSaving()`
  - `grade()`

---

## Validation / Criteria
- All questions must be answered before submitting. *
- Each question allows only **one selected option**. *
- Result includes **score/total, percentage, and PASS/FAIL**. *
- Uses **OOP principles** (classes, inheritance, encapsulation, polymorphism). *
- Uses **localStorage** for temporary persistence. *
- Works correctly even after refreshing the page. *
