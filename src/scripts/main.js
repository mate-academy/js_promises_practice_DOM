'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromiseRight = new Promise((resolve) => {
  document.addEventListener('contextmenu', () => {
    resolve();
  });
});
const thirdPromiseLeft = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const thirdPromise = Promise.all([thirdPromiseLeft, thirdPromiseRight]);

const showMessage = (message, promiseStatus) => {
  const div = document.createElement('div');
  const className = promiseStatus === 'success' ? 'success' : 'warning';

  div.classList.add(className);
  div.dataset.qa = 'notification';
  div.textContent = message;
  document.body.append(div);
};

firstPromise.then(() => showMessage('First promise was resolved', 'success'))
  .catch(() => showMessage('First promise was rejected'));

secondPromise.then(() => showMessage('Second promise was resolved', 'success'))
  .catch(() => showMessage('Second promise was rejected'));

thirdPromise.then(() => showMessage('Third promise was resolved', 'success'))
  .catch(() => showMessage('Third promise was rejected'));
