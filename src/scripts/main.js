'use strict';

/**
 * Допоміжна функція для сповіщень
 */
function showNotification(message, type) {
  const note = document.createElement('div');

  note.setAttribute('data-qa', 'notification');
  note.classList.add(type);
  note.textContent = message;
  document.body.append(note);

  // Збільшуємо час до 5 секунд (або більше),
  // щоб тест встиг знайти елемент після tick(3000)
  setTimeout(() => note.remove(), 5000);
}

// --- firstPromise ---
const firstPromise = new Promise((resolve, reject) => {
  const handleFirst = (e) => {
    if (e.button === 0) {
      // eslint-disable-next-line no-use-before-define
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleFirst);
      resolve('First promise was resolved');
    }
  };

  const timer = setTimeout(() => {
    document.removeEventListener('mousedown', handleFirst);
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('mousedown', handleFirst);
});

// --- secondPromise ---
const secondPromise = new Promise((resolve) => {
  const handleSecond = (e) => {
    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('mousedown', handleSecond);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('mousedown', handleSecond);
});

// --- thirdPromise ---
const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const handleThird = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      document.removeEventListener('mousedown', handleThird);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', handleThird);
});

// --- Обробка результатів ---

firstPromise
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => {
    const message = err instanceof Error ? err.message : err;

    showNotification(message, 'error');
  });

secondPromise.then((msg) => showNotification(msg, 'success'));

thirdPromise.then((msg) => showNotification(msg, 'success'));
