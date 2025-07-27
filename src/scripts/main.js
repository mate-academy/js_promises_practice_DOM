'use strict';

function showNotification(message, type = 'success') {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = `notification ${type}`;
  div.textContent = message;
  document.body.appendChild(div);
}

let leftClicked = false;
let rightClicked = false;

const firstPromise = new Promise(function (resolve, reject) {
  const handleClick = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      document.removeEventListener('click', handleClick);
      clearTimeout(rejectionTimeout);
    }
  };

  const rejectionTimeout = setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('click', handleClick);
  }, 3000);

  document.addEventListener('click', handleClick);
});

const secondPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', handleClick);
    }
  };

  document.addEventListener('mousedown', handleClick);
});

const thirdPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', handleClick);
    }
  };

  document.addEventListener('mousedown', handleClick);
});

firstPromise
  .then((message) => showNotification(message, 'success'))
  .catch((message) => showNotification(message, 'error'));

secondPromise.then((message) => showNotification(message, 'success'));

thirdPromise.then((message) => showNotification(message, 'success'));
