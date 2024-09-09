'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => resolve());

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const leftClick = new Promise((resolve, reject) => {
  document.addEventListener('click', () => resolve());
});

const rigthClick = new Promise((resolve) => {
  document.addEventListener('contextmenu', () => resolve());
});

firstPromise
  .then(() => createMessage('First promise was resolved'))
  .catch((e) => createMessage(e.message, e));

Promise.any([leftClick, rigthClick]).then(() => {
  createMessage('Second promise was resolved');
});

Promise.all([leftClick, rigthClick]).then(() => {
  createMessage('Third promise was resolved');
});

function createMessage(message, error) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = error ? 'error' : 'success';
  div.innerText = message;

  document.body.append(div);
}
