/* eslint-disable prefer-promise-reject-errors */
'use strict';

const body = document.body;

function createMessage(promiseNum, type) {
  let textHtml;
  const lastElem = document.body.lastElementChild;

  if (type === 'resolve') {
    textHtml = `
      <div data-qa="notification" class="success">
        ${promiseNum} promise was resolved
      </div>
    `;
  }

  if (type === 'reject') {
    textHtml = `
      <div data-qa="notification" class="success">
        ${promiseNum} promise was rejected
      </div>
    `;
  }

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

promise1.then(() => createMessage('First', 'resolve'),
  () => createMessage('First', 'reject'));

promise2.then(() => createMessage('Second', 'resolve'));

promise3.then(() => supportPromise)
  .then(() => createMessage('Third', 'resolve'));
