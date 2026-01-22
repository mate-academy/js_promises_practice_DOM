'use strict';

const promise1 = new Promise((resolve, reject) => {
  const id = setTimeout(() => {
    document.removeEventListener('click', handler);
    reject(new Error('First promise was rejected'));
  }, 3000);

  function handler(e) {
    if (e.button === 0) {
      clearTimeout(id);
      document.removeEventListener('click', handler);
      resolve('First promise was resolved');
    }
  }

  document.addEventListener('click', handler);
});

const promise2 = new Promise((resolve, reject) => {
  const handler = (e) => {
    if (e.button === 0) {
      document.removeEventListener('click', handler);
      resolve('Second promise was resolved');
    }

    if (e.button === 2) {
      e.preventDefault();
      document.removeEventListener('click', handler);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('click', handler);
});

const leftCLickPromise = new Promise((resolve, reject) => {
  const handler = (e) => {
    if (e.button === 0) {
      document.removeEventListener('click', handler);
      resolve();
    }
  };

  document.addEventListener('click', handler);
});

const rightLickPromise = new Promise((resolve, reject) => {
  const handler = (e) => {
    if (e.button === 2) {
      document.removeEventListener('click', handler);
      e.preventDefault();
      resolve();
    }
  };

  document.addEventListener('click', handler);
});

const promise3 = new Promise((resolve, reject) => {
  Promise.all([leftCLickPromise, rightLickPromise]).then(() =>
    // eslint-disable-next-line prettier/prettier
    resolve('Third promise was resolved'));
});

function showDiv(message, st) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(st);
  div.textContent = message;
  document.body.append(div);
}

promise1
  .then((m) => showDiv(m, 'success'))
  .catch((m) => showDiv(m.message, 'error'));

promise2
  .then((m) => showDiv(m, 'success'))
  .catch((m) => showDiv(m.message, 'error'));

promise3
  .then((m) => showDiv(m, 'success'))
  .catch((m) => showDiv(m.message, 'error'));
