'use strict';

const showNotification = (text, type = 'success') => {
  const message = document.createElement('div');

  message.dataset.qa = 'notification';
  message.classList.add(type);
  message.textContent = text;
  document.body.append(message);
};

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener(
    'click',
    () => {
      clearTimeout(timerId);
      resolve('First promise was resolved');
    },
    { once: true },
  );
});

firstPromise
  .then((data) => showNotification(data, 'success'))
  .catch((err) => showNotification(err.message, 'error'));

const secondPromise = new Promise((resolve) => {
  const handler = (e) => {
    e.preventDefault();

    document.removeEventListener('click', handler);
    document.removeEventListener('contextmenu', handler);
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', handler);
  document.addEventListener('contextmenu', handler);
});

secondPromise
  .then((data) => showNotification(data, 'success'))
  .catch((err) => showNotification(err.message, 'error'));

const thirdPromise = new Promise((resolve) => {
  let left = false;
  let right = false;

  const check = (e) => {
    if (e.type === 'click') {
      left = true;
    }

    if (e.type === 'contextmenu') {
      e.preventDefault();
      right = true;
    }

    if (left && right) {
      document.removeEventListener('click', check);
      document.removeEventListener('contextmenu', check);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', check);
  document.addEventListener('contextmenu', check);
});

thirdPromise
  .then((data) => showNotification(data, 'success'))
  .catch((err) => showNotification(err.message, 'error'));
