'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = Promise.all([
  new Promise((resolve) => {
    document.addEventListener('click', () => {
      resolve();
    });
  }),

  new Promise((resolve) => {
    document.addEventListener('contextmenu', () => {
      resolve();
    });
  }),
]);

firstPromise
  .then((resolve) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList = 'success';
    div.textContent = resolve;

    body.append(div);
  }).catch((reject) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList = 'error';
    div.textContent = reject;

    body.append(div);
  });

secondPromise
  .then((resolve) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList = 'success';
    div.textContent = resolve;

    body.append(div);
  });

thirdPromise
  .then(() => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList = 'success';
    div.textContent = 'Third promise was resolved';

    body.append(div);
  });
