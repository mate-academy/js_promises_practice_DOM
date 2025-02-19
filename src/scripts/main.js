'use strict';

const body = document.querySelector('body');
const successBothClick = { left: false, right: false };

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener(
    'click',
    (e) => {
      if (e.button === 0) {
        successBothClick.left = true;
        resolve('First promise was resolved');
      }
    },
    { once: true },
  );
  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  body.addEventListener(
    'click',
    (e) => {
      if (e.button === 0) {
        successBothClick.left = true;
        resolve('Second promise was resolved');
        checkThirdPromise();
      }
    },
    { once: true },
  );

  body.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      successBothClick.right = true;
      resolve('Second promise was resolved');
      checkThirdPromise();
    },
    { once: true },
  );
});

firstPromise
  .then((text) => {
    message(text, 'success');
  })
  .catch((error) => {
    message(error.message, 'error');
  });

secondPromise.then((text) => {
  message(text, 'success');
});

function message(text, value) {
  const createMessage = document.createElement('div');

  createMessage.setAttribute('data-qa', 'notification');
  createMessage.classList.add(value);
  createMessage.textContent = text;

  document.body.appendChild(createMessage);

  return createMessage;
}

function checkThirdPromise() {
  if (successBothClick.right && successBothClick.left) {
    new Promise((resolve) => {
      resolve('Third promise was resolved');
    }).then((text) => message(text, 'success'));
  }
}
