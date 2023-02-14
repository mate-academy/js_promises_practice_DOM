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
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  body.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftMouseButtonClicked = false;
  let rightMouseButtonClicked = false;

  body.addEventListener('click', () => {
    leftMouseButtonClicked = true;

    if (leftMouseButtonClicked && rightMouseButtonClicked) {
      resolve('Third promise was resolved');
    }
  });

  body.addEventListener('contextmenu', () => {
    rightMouseButtonClicked = true;

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
