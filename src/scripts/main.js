/* eslint-disable function-paren-newline */
'use strict';

const body = document.body;

// Функція для повідомлень
function showMessage(text, type) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.textContent = text;
  div.classList.add(type);
  body.append(div);
}

// --- First Promise ---
const firstPromise = new Promise((resolve, reject) => {
  const onClick = (e) => {
    if (e.button === 0) {
      // тільки ліва кнопка
      cleanup();
      resolve('First promise was resolved');
    }
  };

  const timeoutId = setTimeout(() => {
    cleanup();
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);

  const cleanup = () => {
    document.removeEventListener('mousedown', onClick);
    clearTimeout(timeoutId);
  };

  document.addEventListener('mousedown', onClick);
});

// --- Second Promise ---
const secondPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('mousedown', handler);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('mousedown', handler);
});

// --- Third Promise ---
const thirdPromise = new Promise((resolve) => {
  let left = false;
  let right = false;

  const handler = (e) => {
    if (e.button === 0) {
      left = true;
    }

    if (e.button === 2) {
      right = true;
    }

    if (left && right) {
      document.removeEventListener('mousedown', handler);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', handler);
});

// --- Запуск і показ повідомлень ---
[firstPromise, secondPromise, thirdPromise].forEach((p) => {
  p.then((msg) => showMessage(msg, 'success')).catch((msg) =>
    showMessage(msg, 'error'),
  );
});
