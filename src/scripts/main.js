'use strict';

const body = document.body;

body.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

function createMessage(textMessage, className) {
  body.insertAdjacentHTML('beforeend',
    `<div
      data-qa="notification"
      class="${className}"
     >
      ${textMessage}
    </div>`
  );
}

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  body.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftMouseButtonClicked = false;
  let rightMouseButtonClicked = false;

  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftMouseButtonClicked = true;
    }

    if (e.button === 2) {
      rightMouseButtonClicked = true;
    }

    if (leftMouseButtonClicked && rightMouseButtonClicked) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((value) => createMessage(value, 'success'))
  .catch((value) => createMessage(value, 'warning'));

secondPromise
  .then((value) => createMessage(value, 'success'));

thirdPromise
  .then((value) => createMessage(value, 'success'));
