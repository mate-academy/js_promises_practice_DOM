'use strict';

const myLogo = document.querySelector('.logo');
const pageBody = document.body;

const handleMessage = (type, message) => {
  const div = document.createElement('div');

  div.setAttribute('class', type);
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;
  pageBody.appendChild(div);
};

const firstPromise = new Promise((resolve, reject) => {
  myLogo.addEventListener('click', (e) => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

firstPromise
  .then((result) => {
    handleMessage('success', result);
  })

  .catch((error) => {
    handleMessage('error', error.message);
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

secondPromise.then((result) => {
  handleMessage('success', result);
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

thirdPromise.then((result) => {
  handleMessage('success', result);
});
