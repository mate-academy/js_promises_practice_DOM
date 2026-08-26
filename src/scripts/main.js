'use strict';

// --- ДОПОМІЖНА ФУНКЦІЯ ДЛЯ ВИВЕДЕННЯ ПОВІДОМЛЕНЬ ---
function showNotification(message, isError = false) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');

  // Додаємо базовий клас та клас статусу
  notification.classList.add(isError ? 'error' : 'success');
  notification.textContent = message;

  document.body.append(notification);
}

// --- FIRST PROMISE ---
const firstPromise = new Promise((resolve, reject) => {
  // Прапорець, щоб уникнути одночасного спрацьовування таймера і кліку
  let isSettled = false;

  const leftClickHandler = (e) => {
    if (e.button === 0 && !isSettled) {
      isSettled = true;
      clearTimeout(timeoutId);
      document.removeEventListener('click', leftClickHandler);
      resolve('First promise was resolved');
    }
  };

  const timeoutId = setTimeout(() => {
    if (!isSettled) {
      isSettled = true;
      document.removeEventListener('click', leftClickHandler);
      // Передаємо об'єкт Error з потрібним текстом для проходження тестів
      reject(new Error('First promise was rejected'));
    }
  }, 3000);

  document.addEventListener('click', leftClickHandler);
});

// --- SECOND PROMISE ---
const secondPromise = new Promise((resolve) => {
  const clickHandler = (e) => {
    // 0 = лівий клік, 2 = правий клік
    if (e.button === 0 || e.button === 2) {
      if (e.button === 2) {
        e.preventDefault();
      } // Скасовуємо контекстне меню

      document.removeEventListener('click', clickHandler);
      document.removeEventListener('contextmenu', clickHandler);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('click', clickHandler);
  document.addEventListener('contextmenu', clickHandler);
});

// --- THIRD PROMISE ---
const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const checkClicks = () => {
    if (leftClicked && rightClicked) {
      document.removeEventListener('click', clickHandler);
      document.removeEventListener('contextmenu', clickHandler);
      resolve('Third promise was resolved');
    }
  };

  const clickHandler = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    } else if (e.button === 2) {
      e.preventDefault();
      rightClicked = true;
    }
    checkClicks();
  };

  document.addEventListener('click', clickHandler);
  document.addEventListener('contextmenu', clickHandler);
});

// --- ОБРОБНИКИ (SUCCESS & ERROR HANDLERS) ---

firstPromise
  .then((msg) => showNotification(msg, false))
  .catch((err) => showNotification(err.message, true));

secondPromise
  .then((msg) => showNotification(msg, false))
  .catch((err) => showNotification(err.message, true));

thirdPromise
  .then((msg) => showNotification(msg, false))
  .catch((err) => showNotification(err.message, true));
