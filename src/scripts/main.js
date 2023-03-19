'use strict';

const body = document.querySelector('body');
const mouseEvent = {};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => reject(Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 2 || ev.button === 0) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (ev) => {
    switch (ev.button) {
      case 0:
        mouseEvent.left = true;
        break;
      case 2:
        mouseEvent.right = true;
        break;
    }

    if (mouseEvent.left && mouseEvent.right) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then((result) => message(result, 'success'))
  .catch((result) => message(result, 'warning'));
secondPromise.then((result) => message(result, 'success'));
thirdPromise.then((result) => message(result, 'success'));

function message(string, nameClass) {
  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="${nameClass}">${string}</div>
  `);
}
