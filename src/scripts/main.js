'use strict';

// Функція для створення сповіщень
function createNotification(message, type) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(type); // success або error
  div.textContent = message;
  document.body.appendChild(div);
}

const promise1 = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);

  // eslint-disable-next-line no-shadow
  document.addEventListener('click', (event) => {
    if (event.button === 0) {
      // Лівий клік (0 — це лівий клік миші)
      clearTimeout(timeout);
      resolve('First promise was resolved');
    }
  });
});

promise1
  .then((message) => createNotification(message, 'success'))
  .catch((message) => createNotification(message, 'error'));

const promise2 = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });
});

promise2.then((message) => createNotification(message, 'success'));

// promise3
let leftClick = false;
let rightClick = false;

const promise3 = new Promise((resolve) => {
  // eslint-disable-next-line no-shadow
  document.addEventListener('click', (event) => {
    if (event.button === 0) {
      leftClick = true; // Лівий клік
    }

    if (event.button === 2) {
      rightClick = true; // Правий клік
    }

    // Якщо був і лівий, і правий клік, вирішуємо проміс
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
    event.preventDefault();
  });
});

promise3.then((message) => createNotification(message, 'success'));
