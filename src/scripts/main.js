'use strict';

// Допоміжна функція для показу повідомлень
function showNotification(message, isSuccess = true) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = isSuccess ? 'success' : 'error';
  div.textContent = message;

  document.body.append(div);
}

// Флаги для третього promise
let leftClicked = false;
let rightClicked = false;

// ================= FIRST PROMISE =================

const firstPromise = new Promise((resolve, reject) => {
  // Таймер на 3 секунди — якщо не було кліку, promise буде відхилений
  const timer = setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);

  document.addEventListener(
    'click',
    () => {
      clearTimeout(timer);
      resolve('First promise was resolved');
    },
    { once: true }, // спрацьовує лише один раз
  );
});

// Handlers для першого promise
firstPromise
  .then((msg) => showNotification(msg, true))
  .catch((msg) => showNotification(msg, false));

// ================= SECOND PROMISE =================

const secondPromise = new Promise((resolve) => {
  const handler = () => {
    resolve('Second promise was resolved');
  };

  // Лівий клік
  document.addEventListener('click', handler, { once: true });

  // Правий клік
  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault(); // прибираємо стандартне меню
      handler();
    },
    { once: true },
  );
});

// Handlers для другого promise (reject тут немає)
secondPromise.then((msg) => showNotification(msg, true));

// ================= THIRD PROMISE =================

const thirdPromise = new Promise((resolve) => {
  function checkBothClicks() {
    if (leftClicked && rightClicked) {
      resolve(
        // eslint-disable-next-line max-len
        'Third promise was resolved',
      );
    }
  }

  // Лівий клік
  document.addEventListener('click', () => {
    leftClicked = true;
    checkBothClicks();
  });

  // Правий клік
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClicked = true;
    checkBothClicks();
  });
});

// Handler для третього promise
thirdPromise.then((msg) => showNotification(msg, true));
