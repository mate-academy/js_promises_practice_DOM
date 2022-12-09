'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

promise1
  .then(message => addMessage('success', message))
  .catch(message => addMessage('warning', message));

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

promise2.then(message => addMessage('success', message));

const promise3 = new Promise((resolve, reject) => {
  let leftButton = false;
  let rigthButton = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftButton = true;
    }

    if (e.button === 2) {
      rigthButton = true;
    }

    if (leftButton && rigthButton) {
      resolve('Third promise was resolved');
    }
  });
});

promise3.then(message => addMessage('success', message));

function addMessage(type, text) {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="${type}" data-qa="notification">${text}</div>
  `);
}
