'use strict';

const body = document.body;
const promise1 = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const promise2 = new Promise((resolve) => {
  body.addEventListener('click', () => resolve('Second promise was resolved'));

  body.addEventListener('contextmenu', () =>
    resolve('Second promise was resolved'));
});

const promise3 = new Promise((resolve) => {
  let left = false;
  let right = false;

  document.addEventListener('mousedown', e => {
    if (e.button === 0) {
      left = true;
    }

    if (e.button === 2) {
      right = true;
    }

    if (left && right) {
      resolve('Third promise was resolved');
    }
  });
});

promise1
  .then(text => createNotification(text))
  .catch(text => createNotification(text, 'worning'));
promise2.then(text => createNotification(text));
promise3.then(text => createNotification(text));

function createNotification(text, className = 'sucsses') {
  body.insertAdjacentHTML('beforeend', `
      <div class="${className}" data-qa="notification">
        ${text}
      </div>
    `);
}
