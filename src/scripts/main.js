'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve(`First promise was resolved`);
  });

  setTimeout(() => {
    reject(Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve(`Second promise was resolved`);
  });

  document.addEventListener('contextmenu', () => {
    resolve(`Second promise was resolved`);
  });
});

const click = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const contextmenu = new Promise((resolve) => {
  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  Promise.all([click, contextmenu])
    .then(() => resolve('Third promise was resolved'));
});

const success = (suc) => {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="success">${suc}</div>
  `);
};

const error = (err) => {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="warning">${err}</div>
  `);
};

firstPromise
  .then(success)
  .catch(error);

secondPromise
  .then(success);

thirdPromise
  .then(success);
