'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');

    clearTimeout(timerForReject);
  });

  const timerForReject
   = setTimeout(() => reject(Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () =>
    resolve('Second promise was resolved'));

  document.addEventListener('contextmenu', () =>
    resolve('Second promise was resolved'));
});

const thirdPromise = new Promise((resolve) => {
  let click;
  let contextmenu;

  document.addEventListener('click', () => {
    if (contextmenu) {
      resolve('Third promise was resolved');
    }

    click = true;
  });

  document.addEventListener('contextmenu', () => {
    if (click) {
      resolve('Third promise was resolved');
    }

    contextmenu = true;
  });
});

function notification(type, text) {
  const body = document.querySelector('body');

  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="${type} margin">${text}</div>
  `);
}

const success = (promise) => notification('success', `${promise}`);

const error = (promise) => notification('error', `${promise}`);

firstPromise.then(success, error);
secondPromise.then(success);
thirdPromise.then(success);
