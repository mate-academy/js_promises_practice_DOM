'use strict';

const logo = document.querySelector('.logo');
const page = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  logo.addEventListener('click', (clickEvent) => {
    if (clickEvent.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (clickEvent) => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (clickEvent) => {
    clickEvent.preventDefault();
    resolve(`Second promise was resolved`);
  });
});

const leftClickPromise = new Promise((resolve) => {
  page.addEventListener('click', (clickEvent) => {
    resolve();
  });
});

const rightClickPromise = new Promise((resolve) => {
  page.addEventListener('contextmenu', (clickEvent) => {
    clickEvent.preventDefault();
    resolve();
  });
});

const thirdPromise = Promise.all([leftClickPromise, rightClickPromise])
  .then(() => 'Third promise was resolved');

const successHandler = (result) => {
  const message = document.createElement('div');

  message.classList.add('notification', 'notification--success');
  message.textContent = result;
  message.dataset.qa = 'notification';
  page.append(message);
};

const errorHandler = (result) => {
  const message = document.createElement('div');

  message.classList.add('notification', 'notification--warning');
  message.textContent = result;
  message.dataset.qa = 'notification';
  page.append(message);
};

firstPromise
  .then(successHandler)
  .catch(errorHandler);

secondPromise
  .then(successHandler);

thirdPromise
  .then(successHandler);
