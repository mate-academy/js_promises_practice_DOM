'use strict';

function insertMessage(messageClass, message) {
  document.body.insertAdjacentHTML('beforeend',
    `<div data-qa="notification" class = ${messageClass}> ${message}</div>`
  );
};

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => resolve());

  setTimeout(() => reject(Error), 3000);
});

promise1.then(
  () => insertMessage('success', 'First promise was resolved'))
  .catch(
    () => insertMessage('warning', 'First promise was rejected')
  );

const promise2 = new Promise((resolve, reject) =>
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve();
    }
  }));

promise2.then(
  () => insertMessage('success', 'Second promise was resolved')
).catch();

const promise3 = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve();
    }
  });
});

promise3.then(
  () => insertMessage('success', 'Third promise was resolved')
).catch();
