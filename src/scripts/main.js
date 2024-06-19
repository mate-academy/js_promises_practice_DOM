'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const handler = () => {
    resolve();
    document.removeEventListener('click', resolve);
  };

  document.addEventListener('click', handler);

  setTimeout(reject, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  const handler = () => {
    resolve();
    document.removeEventListener('click', resolve);
    document.removeEventListener('contextmenu', resolve);
  };

  document.addEventListener('click', handler);
  document.addEventListener('contextmenu', handler);
});

const thirdPromise = new Promise((resolve, reject) => {
  let left = false;
  let right = false;

  const leftClick = () => {
    left = true;

    if (right) {
      resolve();
      document.removeEventListener('click', leftClick);
      document.removeEventListener('contextmenu', rightClick);
    }
  };

  const rightClick = () => {
    right = true;

    if (left) {
      resolve();
      document.removeEventListener('click', leftClick);
      document.removeEventListener('contextmenu', rightClick);
    }
  };

  document.addEventListener('click', leftClick);
  document.addEventListener('contextmenu', rightClick);
});

const success = (message) => {
  document.body.insertAdjacentHTML(
    'afterbegin',
    `<div class="success" data-qa="notification">${message}</div>`,
  );
};

const error = (message) => {
  document.body.insertAdjacentHTML(
    'afterbegin',
    `<div class="error" data-qa="notification">${message}</div>`,
  );
};

firstPromise
  .then(() => success('First promise was resolved'))
  .catch(() => error('First promise was rejected'));

secondPromise.then(() => success('Second promise was resolved'));

thirdPromise.then(() => success('Third promise was resolved'));
