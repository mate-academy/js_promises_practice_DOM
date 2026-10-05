'use strict';

let firstPromiseResolve;
let secondPromiseResolve;
let thirdPromiseResolve;

let leftClicked = false;
let rightClicked = false;

const firstPromise = new Promise((resolve, reject) => {
  firstPromiseResolve = resolve;

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  secondPromiseResolve = resolve;
});

const thirdPromise = new Promise((resolve) => {
  thirdPromiseResolve = resolve;
});

function showNotification(type, message) {
  const oldNotification = document.querySelector('[data-qa="notification"]');

  if (oldNotification) {
    oldNotification.remove();
  }

  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.className = type;
  notification.textContent = message;

  document.body.append(notification);
}

firstPromise
  .then((message) => {
    showNotification('success', message);
  })
  .catch((error) => {
    showNotification('error', error.message);
  });

secondPromise.then((message) => {
  showNotification('success', message);
});

thirdPromise.then((message) => {
  showNotification('success', message);
});

document.addEventListener('mousedown', (mouseEvent) => {
  if (mouseEvent.button === 0) {
    leftClicked = true;

    firstPromiseResolve('First promise was resolved');
    secondPromiseResolve('Second promise was resolved');
  }

  if (mouseEvent.button === 2) {
    rightClicked = true;

    secondPromiseResolve('Second promise was resolved');
  }

  if (leftClicked && rightClicked) {
    thirdPromiseResolve('Third promise was resolved');
  }
});
