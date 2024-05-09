/* eslint-disable prefer-promise-reject-errors */
'use strict';

function createMessage(message, className) {
  document.body.insertAdjacentHTML(
    'afterbegin',
    `
    <div data-qa="notification" class="${className}">
    ${message}
    </div>
    `,
  );
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject();
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftCounter = 0;
  let rightCounter = 0;

  document.addEventListener('click', () => {
    leftCounter++;

    if (leftCounter && rightCounter) {
      resolve();
    }
  });

  document.addEventListener('contextmenu', () => {
    rightCounter++;

    if (leftCounter && rightCounter) {
      resolve();
    }
  });
});

firstPromise
  .then(() => createMessage('First promise was resolved', 'success'))
  .catch(() => createMessage('First promise was rejected', 'error'));

secondPromise.then(() =>
  // eslint-disable-next-line prettier/prettier
  createMessage(`Second promise was resolved`, 'success'));

thirdPromise.then(() => createMessage('Third promise was resolved', 'success'));
