'use strict';

/**
 * Функція для показу сповіщень згідно з вимогами завдання.
 * @param {string} text - Текст повідомлення
 * @param {boolean} isError - Чи це помилка
 */
function showNotification(text, isError = false) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.textContent = text;

  if (isError) {
    notification.classList.add('error');
  } else {
    notification.classList.add('success');
  }

  document.body.appendChild(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener(
    'click',
    () => {
      clearTimeout(timeoutId);
      resolve('First promise was resolved');
    },
    { once: true },
  );
});

firstPromise
  .then((msg) => showNotification(msg))
  .catch((err) => showNotification(err.message, true));

const leftClick = new Promise((resolve) => {
  document.addEventListener(
    'click',
    () => resolve('Second promise was resolved'),
    { once: true },
  );
});

const rightClick = new Promise((resolve) => {
  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      resolve('Second promise was resolved');
    },
    { once: true },
  );
});

const secondPromise = Promise.any([leftClick, rightClick]);

secondPromise.then((msg) => showNotification(msg));

const leftForThird = new Promise((resolve) => {
  document.addEventListener('click', () => resolve(), { once: true });
});

const rightForThird = new Promise((resolve) => {
  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      resolve();
    },
    { once: true },
  );
});

const thirdPromise = Promise.all([leftForThird, rightForThird]);

thirdPromise.then(() => {
  showNotification('Third promise was resolved');
});
