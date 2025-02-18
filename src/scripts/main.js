'use strict';

const body = document.querySelector('body');
const notific = document.createElement('div');

notific.setAttribute('data-qa', 'notification');

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    clearTimeout(timeout);
    resolve();
  });

  const timeout = setTimeout(() => {
    reject();
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  body.addEventListener('click', () => {
    resolve();
  });

  body.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  Promise.allSettled([firstPromise, secondPromise]).then(() => {
    resolve();
  });
});

firstPromise
  .then(() => {
    notific.classList.add('success');
    makeMessages('First promise was resolved');
  })
  .catch(() => {
    notific.classList.add('error');
    makeMessages('First promise was rejected', true);
  });

secondPromise.then(() => {
  notific.classList.add('success');
  makeMessages('Second promise was resolved');
});

thirdPromise.then(() => {
  notific.classList.add('success');
  makeMessages('Third promise was resolved');
});

const makeMessages = (text, isError) => {
  notific.textContent = text;
  body.append(notific);
};
