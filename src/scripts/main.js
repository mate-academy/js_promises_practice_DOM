'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(
    () => reject(new Error('First promise was rejected')),
    3000,
  );

  document.addEventListener('click', () => {
    clearTimeout(timeoutId);
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const firstEvent = new Promise((resolve) => {
  document.addEventListener('contextmenu', () => resolve());
});

const secondEvent = new Promise((resolve) => {
  document.addEventListener('click', () => resolve());
});

const thirdPromise = Promise.all([firstEvent, secondEvent]).then(() => {
  return 'Third promise was resolved';
});

const fulfilled = (message) =>
  document.body.insertAdjacentHTML(
    'afterbegin',
    `<div data-qa="notification" class="success">${message}</div>`,
  );

const rejected = (error) =>
  document.body.insertAdjacentHTML(
    'afterbegin',
    `<div data-qa="notification" class="error">${error.message}</div>`,
  );

firstPromise.then(fulfilled, rejected);
secondPromise.then(fulfilled, rejected);
thirdPromise.then(fulfilled, rejected);
