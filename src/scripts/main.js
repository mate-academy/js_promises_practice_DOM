'use strict';

const logo = document.querySelector('.logo');
const body = document.querySelector('body');
const handleMessage = (type, message) => {
  const div = document.createElement('div');

  div.setAttribute('class', type);
  div.setAttribute('data-qa', 'notification');

  div.textContent = message;
  body.append(div);
};

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
    handleMessage('success', message);
  })
  .catch((errorMesage) => {
    handleMessage('error', errorMesage);
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
  handleMessage('success', message);
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
  handleMessage('success', message);
});
