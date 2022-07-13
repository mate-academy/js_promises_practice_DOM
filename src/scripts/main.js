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

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', resolve);
  setTimeout(() => reject(new Error()), 3000);
});

firstPromise
  .then(() => notification(`success`, 'First promise was resolved'))
  .catch(() => notification(`warning`, 'First promise was rejected'));

const secondPromise = new Promise((resolve) => {
  body.addEventListener('mousedown', (clickEvent) => {
    const button = clickEvent.button;

    if (button === 0 || button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise.then(result => notification('success', result));

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
      resolve('Third promise was resolved');
    };
  });
});

thirdPromise.then(result => notification(`success`, result));
