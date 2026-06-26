'use strict';

'use strict';

// --- 1. ДОПОМІЖНА ФУНКЦІЯ ДЛЯ СТВОРЕННЯ ПОВІДОМЛЕНЬ ---
const showNotification = (message, isSuccess) => {
  const notification = document.createElement('div');

  // Додаємо обов'язковий дата-атрибут з умови завдання
  notification.setAttribute('data-qa', 'notification');

  // Додаємо відповідний клас
  notification.classList.add(isSuccess ? 'success' : 'error');
  notification.textContent = message;

  document.body.append(notification);
};

// --- 2. СТВОРЕННЯ FIRST PROMISE ---
const firstPromise = new Promise((resolve, reject) => {
  const handleLeftClick = (e) => {
    if (e.button === 0) {
      // 0 = лівий клік миші
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleLeftClick);
      resolve('First promise was resolved');
    }
  };

  const timer = setTimeout(() => {
    document.removeEventListener('mousedown', handleLeftClick);
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('mousedown', handleLeftClick);
});

// --- 3. СТВОРЕННЯ SECOND PROMISE ---
const secondPromise = new Promise((resolve) => {
  const handleAnyClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      // 0 = лівий, 2 = правий клік
      if (e.button === 2) {
        e.preventDefault(); // скасовуємо виклик стандартного меню браузера
      }
      document.removeEventListener('mousedown', handleAnyClick);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('mousedown', handleAnyClick);
});

// --- 4. СТВОРЕННЯ THIRD PROMISE ---
// Створюємо два окремі проміси для лівого та правого кліків
const waitForLeft = new Promise((resolve) => {
  const handler = (e) => {
    if (e.button === 0) {
      document.removeEventListener('mousedown', handler);
      resolve();
    }
  };

  document.addEventListener('mousedown', handler);
});

const waitForRight = new Promise((resolve) => {
  const handler = (e) => {
    if (e.button === 2) {
      e.preventDefault();
      document.removeEventListener('mousedown', handler);
      resolve();
    }
  };

  document.addEventListener('mousedown', handler);
});

// Об'єднуємо їх через Promise.all
const thirdPromise = Promise.all([waitForLeft, waitForRight]).then(() => {
  return 'Third promise was resolved';
});

// --- 5. НАВІШУВАННЯ ОБРОБНИКІВ НА УСІ ПРОМІСИ ---

firstPromise
  .then((msg) => showNotification(msg, true))
  .catch((err) => showNotification(err.message, false));

secondPromise
  .then((msg) => showNotification(msg, true))
  .catch((err) => showNotification(err.message, false));

thirdPromise
  .then((msg) => showNotification(msg, true))
  .catch((err) => showNotification(err.message, false));
