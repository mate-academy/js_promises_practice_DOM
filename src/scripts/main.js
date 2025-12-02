'use strict';

function showNotification(type, message) {
  const box = document.createElement('div');

  box.setAttribute('data-qa', 'notification');
  box.classList.add(type);
  box.textContent = message;
  document.body.appendChild(box);
}

function handlePromise(promise) {
  return promise
    .then((msg) => {
      showNotification('success', msg);
    })
    .catch((err) => {
      showNotification('error', err.message);
    });
}

const firstPromise = new Promise(function (resolve, reject) {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve(`First promise was resolved`);
    }
  });

  setTimeout(() => {
    reject(new Error(`First promise was rejected`));
  }, 3000);
});

const secondPromise = new Promise(function (resolve, reject) {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve(`Second promise was resolved`);
    }
  });
});

const thirdPromise = new Promise(function (resolve, reject) {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  handlePromise(firstPromise);
  handlePromise(secondPromise);
  handlePromise(thirdPromise);
});
