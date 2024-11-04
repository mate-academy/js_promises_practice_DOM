'use strict';

function showMessage(message, isError = false) {
  const messageDiv = document.createElement('div');

  messageDiv.classList.add(isError ? 'error' : 'success');
  messageDiv.setAttribute('data-qa', 'notification');
  messageDiv.textContent = message;
  document.body.appendChild(messageDiv);
}

const firstPromise = new Promise((resolve, reject) => {
  const logo = document.querySelector('.logo');

  logo.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((message) => {
    showMessage(message);
  })
  .catch((error) => {
    showMessage(error.message, true);
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise.then((message) => {
  showMessage(message);
});

let rightClick = false;
let leftClick = false;

const thirdPromise = new Promise((resolve) => {
  function bothClick() {
    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', () => {
    leftClick = true;
    bothClick();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;
    bothClick();
  });
});

thirdPromise.then((message) => showMessage(message));
