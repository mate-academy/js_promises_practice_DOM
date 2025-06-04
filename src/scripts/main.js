'use strict';

const body = document.querySelector('body');

const promise1 = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

promise1
  .then(() => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.className = 'success';
    div.textContent = 'First promise was resolved';
    body.append(div);
  })
  .catch((error) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.className = 'error';
    div.textContent = error.message;
    body.append(div);
  });

const promise2 = new Promise((resolve, reject) => {
  const handler = () => {
    resolve();
    body.removeEventListener('click', handler);
    body.removeEventListener('contextmenu', handler);
  };

  body.addEventListener('click', handler);
  body.addEventListener('contextmenu', handler);
});

promise2.then(() => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'success';
  div.textContent = 'Second promise was resolved';
  body.append(div);
});

const promises = new Promise((resolve) => {
  body.addEventListener('contextmenu', () => resolve(), { once: true });
});

const promises1 = new Promise((resolve) => {
  body.addEventListener('click', () => resolve(), { once: true });
});

Promise.all([promises, promises1]).then(() => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'success';
  div.textContent = 'Third promise was resolved';
  body.append(div);
});
