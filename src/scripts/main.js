'use strict';

const logo = document.querySelector('.logo');

function createNessage(message, className) {
  logo.insertAdjacentHTML('afterend', `
    <div data-qa="notification" class=${className}>${message}</div>
  `);
}

const firsPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('something wrong'));
  }, 3000);
});

firsPromise
  .then(message =>
    createNessage(message, 'success')
  )
  .catch(() =>
    createNessage('First promise was rejected', 'warning')
  );

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (mouseEvent) => {
    if (mouseEvent.button === 1) {
      reject(new Error('middle button'));
    }
    resolve('Second promise was resolved');
  });
});

secondPromise
  .then(message =>
    createNessage(message, 'success')
  );

const thirdPromise = new Promise((resolve, reject) => {
  let mouseLeft = false;
  let mouseRight = false;

  document.addEventListener('mousedown', (mouseEvent) => {
    if (mouseEvent.button === 0) {
      mouseLeft = true;
    }

    if (mouseEvent.button === 2) {
      mouseRight = true;
    }

    if (mouseRight && mouseLeft) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then(message =>
    createNessage(message, 'success')
  );
