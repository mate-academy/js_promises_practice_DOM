'use strict';

function createMessage(message, messageClass) {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="${messageClass}">
      ${message}
    </div>
  `);
}

const rightClick = new Promise((resolve, reject) => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
});

const leftClick = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve();
    }
  });
});

const firstPromise = new Promise((resolve, reject) => {
  leftClick.then(success => resolve());

  setTimeout(() => reject(Error()), 3000);
});

const secondPromise = Promise.race([rightClick, leftClick]);

const thirdPromise = Promise.all([rightClick, leftClick]);

firstPromise
  .then(success => createMessage('First promise was resolved', 'success'))
  .catch(Err => createMessage('First promise was rejected', 'warning'));

secondPromise
  .then(success => createMessage('Second promise was resolved', 'success'));

thirdPromise
  .then(success => createMessage('Third promise was resolved', 'success'));
