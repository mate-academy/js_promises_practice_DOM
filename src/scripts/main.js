'use strict';

const logo = document.querySelector('.logo');
const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  logo.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    const error = 'First promise was rejected';

    reject(error);
  }, 3000);
});

firstPromise
  .then((message) => {
    const div = document.createElement('div');

    div.setAttribute('class', 'success');
    div.setAttribute('data-qa', 'notification');

    div.textContent = message;
    body.append(div);
  })
  .catch((errorMesage) => {
    const div = document.createElement('div');

    div.setAttribute('class', 'error');
    div.setAttribute('data-qa', 'notification');

    div.textContent = errorMesage;
    body.append(div);
  });

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

secondPromise.then((message) => {
  const div = document.createElement('div');

  div.setAttribute('class', 'success');
  div.setAttribute('data-qa', 'notification');

  div.textContent = message;
  body.append(div);
});

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      resolve('Third promise was resolved');
    });
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    document.addEventListener('click', () => {
      resolve('Third promise was resolved');
    });
  });
});

thirdPromise.then((message) => {
  const div = document.createElement('div');

  div.setAttribute('class', 'success');
  div.setAttribute('data-qa', 'notification');

  div.textContent = message;
  body.append(div);
});
