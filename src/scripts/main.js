'use strict';

const html = document.querySelector('html');
const body = document.querySelector('body');

function createMessage(type, message) {
  body.insertAdjacentHTML('beforeend', `
      <div class="${type}" data-qa="notification">
        ${message}
      </div>
      `);
};

const promise1 = new Promise((resolve, reject) => {
  html.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

const promise2 = new Promise(resolve => {
  html.addEventListener('click', () => {
    resolve();
  });

  html.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
});

const leftClick = new Promise((resolve) => {
  html.addEventListener('click', () => {
    resolve();
  });
});

const rigthClick = new Promise((resolve) => {
  html.addEventListener('contextmenu', e => {
    e.preventDefault();
    resolve();
  });
});

const promise3 = Promise.all([leftClick, rigthClick]);

promise1
  .then(() => createMessage('success', 'First promise was resolved'))
  .catch(() => createMessage('error', 'First promise was rejected'));

promise2
  .then(() => createMessage('success', 'Second promise was resolved'))
  .catch((error) => error);

promise3
  .then(() => createMessage('success', 'Third promise was resolved'))
  .catch((error) => error);
