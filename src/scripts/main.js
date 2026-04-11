'use strict';

const showNotification = (message, isError = false) => {
  const div = document.createElement('div');
  div.setAttribute('data-qa', 'notification');
  div.className = isError ? 'error' : 'success';
  div.textContent = message;
  document.body.append(div);
};

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', () => {
    clearTimeout(timerId);
    resolve('First promise was resolved');
  }, { once: true });
});

const secondPromise = new Promise((resolve) => {
  const handler = () => {
    document.removeEventListener('click', handler);
    document.removeEventListener('contextmenu', handler);
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', handler);
  document.addEventListener('contextmenu', handler);
});

const leftClickWait = new Promise(resolve => {
  document.addEventListener('click', () => resolve(), { once: true });
});

const rightClickWait = new Promise(resolve => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  }, { once: true });
});

const thirdPromise = Promise.all([leftClickWait, rightClickWait])
  .then(() => 'Third promise was resolved');

firstPromise
  .then(message => showNotification(message))
  .catch(error => showNotification(error.message, true));

secondPromise
  .then(message => showNotification(message))
  .catch(error => showNotification(error.message, true));

thirdPromise
  .then(message => showNotification(message))
  .catch(error => showNotification(error.message, true));
