'use strict';

function showNote(message, className) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = className;

  div.textContent = message;
  document.body.append(div);
}

const promise1 = new Promise((resolve, reject) => {
  const id = setTimeout(
    () => reject(new Error('First promise was rejected')),
    3000,
  );

  document.addEventListener(
    'click',
    () => {
      resolve('First promise was resolved');
      clearTimeout(id);
    },
    { once: true },
  );
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener(
    'click',
    () => {
      resolve('Second promise was resolved');
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      resolve('Second promise was resolved');
    },
    { once: true },
  );
});

const leftClickPromise = new Promise((resolve, reject) => {
  document.addEventListener(
    'click',
    () => {
      resolve('Third promise was resolved');
    },
    { once: true },
  );
});

const rightClickPromise = new Promise((resolve, reject) => {
  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      resolve();
    },
    { once: true },
  );
});

const promise3 = Promise.all([leftClickPromise, rightClickPromise]);

promise1
  .then((message) => showNote(message, 'success'))
  .catch((error) => showNote(error.message, 'error'));

promise2.then((message) => showNote(message, 'success'));

promise3.then(() => showNote('Third promise was resolved', 'success'));
