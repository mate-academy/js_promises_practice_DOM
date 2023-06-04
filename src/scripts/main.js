'use strict';

function createMessage(nameClass, message) {
  document.body.insertAdjacentHTML('afterbegin', `
    <div data-qa="notification" class="${nameClass}">
      ${message}
    </div>
  `);
}

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

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

firstPromise
  .then(result => createMessage('success', result))
  .catch(error => createMessage('warning', error.message));

secondPromise
  .then(result => createMessage('success', result));

function createPromise(ev, message) {
  return new Promise((resolve) => {
    document.addEventListener(ev, () => {
      resolve(message);
    });
  });
}

const secondPromiseLeft = createPromise('click',
  'Second promise was resolved left');
const secondPromiseRight = createPromise('contextmenu',
  'Second promise was resolved right');

Promise.all([secondPromiseLeft, secondPromiseRight])
  .then(() => createMessage('success', 'Third promise was resolved'));
