'use strict';

const body = document.querySelector('body');

const notification = (className, msg) => {
  body.insertAdjacentHTML(
    'beforeend',
    `<div class='${className}' data-qa="notification">
      ${msg}
    </div>`
  );
};

const successHandler = (number) => (
  notification('message', `${number} promise was resolved!`)
);
const errorHandler = (number) => (
  notification('error-message', `${number} promise was rejected!`)
);

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', resolve);
  setTimeout(() => reject(new Error()), 3000);
});

const secondPromise = new Promise((resolve) => {
  body.addEventListener('mousedown', (clickEvent) => {
    const button = clickEvent.button;

    if (button === 0 || button === 2) {
      resolve('Second');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let left;
  let right;

  body.addEventListener('mousedown', (clickEvent) => {
    const button = clickEvent.button;

    if (button === 0) {
      left = true;
    };

    if (button === 2) {
      right = true;
    };

    if (left && right) {
      resolve('Third');
    };
  });
});

firstPromise
  .then(() => successHandler('First'))
  .catch(() => errorHandler('First'));

secondPromise.then(result => successHandler(result));

thirdPromise.then(result => successHandler(result));
