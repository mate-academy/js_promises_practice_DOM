/* eslint-disable prefer-promise-reject-errors */
'use strict';

const body = document.body;

function createMessage(message) {
  const lastElem = document.body.lastElementChild;

  const textHtml = `
    <div data-qa="notification" class="success">
      ${message}
    </div>
  `;

  lastElem.insertAdjacentHTML('beforebegin', textHtml);
}

const promise1 = new Promise((resolve, reject) => {
  body.addEventListener('click', () => resolve());
  setTimeout(() => reject(), 3000);
});

const promise2 = new Promise(resolve => {
  body.addEventListener('click', () => resolve());

  body.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    resolve();
  });
});

const promise3 = new Promise((resolve, reject) => {
  body.addEventListener('click', () => resolve());
});

const supportPromise = new Promise(resolve => {
  body.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    resolve();
  });
});

promise1.then(() => createMessage('First promise was resolved'),
  () => createMessage('First promise was rejected'));

promise2.then(() => createMessage('Second promise was resolved'));

promise3.then(() => supportPromise)
  .then(() => createMessage('Third promise was resolved'));
