'use strict';

let leftClick = false;
let rightClick = false;

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  const handleClick = (e) => {
    if (e.button === 0) {
      clicked = true;
      resolve(`First promise was resolved`);
      document.removeEventListener('mousedown', handleClick);
    }
  };

  document.addEventListener('mousedown', handleClick);

  setTimeout(() => {
    if (!clicked) {
      reject(new Error(`First promise was rejected`));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve(`Second promise was resolved`);
      document.removeEventListener('mousedown', handleClick);
    }
  };

  document.addEventListener('mousedown', handleClick);
});

const thirdPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve(`Third promise was resolved`);
      document.removeEventListener('mousedown', handleClick);
    }
  };

  document.addEventListener('mousedown', handleClick);
});

function successMessage(text) {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');
  message.classList.add('success');
  message.innerText = text;

  document.body.appendChild(message);
}

function errorMessage(text) {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');
  message.classList.add('error');
  message.innerText = text;

  document.body.appendChild(message);
}

firstPromise
  .then(() => {
    successMessage(`First promise was resolved`);
  })
  .catch(() => errorMessage(`First promise was rejected`));

secondPromise
  .then(() => {
    successMessage(`Second promise was resolved`);
  })
  .catch(() => errorMessage(`Second promise was rejected`));

thirdPromise
  .then(() => {
    successMessage(`Third promise was resolved`);
  })
  .catch(() => errorMessage(`Third promise was rejected`));
