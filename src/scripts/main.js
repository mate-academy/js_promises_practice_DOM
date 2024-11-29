'use strict';

function createNotification(messange, type) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = type; // // success або error
  notification.textContent = messange;
  document.body.appendChild(notification);
}

// firstPromise: вирішується або відхиляється через 3 секунди
let firstPromiseResolved = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    if (!firstPromiseResolved) {
      firstPromiseResolved = true;
      resolve('First promise was resolved');
    }
  });

  // відхилення через 3 с,якщо не клацнути
  setTimeout(() => {
    if (!firstPromiseResolved) {
      resolve(new Error('First promise was rejected'));
    }
  }, 3000);
});

// обробник для firsPromise
firstPromise
  .then((messange) => createNotification(messange, 'success'))
  .catch((error) => createNotification(error, 'error'));

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

// обробник для second
secondPromise.then((messange) => createNotification(messange, 'success'));

let leftClick = false;
let rightClik = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClik = true;
    }

    if (leftClick && rightClik) {
      resolve('Third promise was resolved');
    }
  });
});

// обробник ддя thirdPromise
thirdPromise.then((messange) => createNotification(messange, 'success'));
