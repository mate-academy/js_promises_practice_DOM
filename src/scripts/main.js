'use strict';

const notificationDiv = document.querySelector('[data-qa="notification"]');
const body = document.querySelector('body');

let leftClicked = false;
let rightClicked = false;

const firstPromise = new Promise((resolve, reject) => {
  const clickHandler = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved on a left click in the document');
    }
  };

  body.addEventListener('click', clickHandler, { once: true });

  setTimeout(() => {
    body.removeEventListener('click', clickHandler);
    reject(new Error('First promise was rejected in 3 seconds if not clicked'));
  }, 3000);
});

firstPromise.then(
  (message) => showNotification('success', message),
  (error) => showNotification('warning', error.message)
);

const secondPromise = new Promise((resolve) => {
  const clickHandler = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  };

  body.addEventListener('click', clickHandler, { once: true });
});

secondPromise.then((message) => showNotification('success', message));

const thirdPromise = new Promise((resolve) => {
  const leftClickHandler = () => {
    leftClicked = true;
    checkAndResolve();
  };

  const rightClickHandler = () => {
    rightClicked = true;
    checkAndResolve();
  };

  const checkAndResolve = () => {
    if (leftClicked && rightClicked) {
      resolve(
        // eslint-disable-next-line max-len
        'Third promise was resolved only after both left and right clicks happened'
      );
    }
  };

  body.addEventListener('click', leftClickHandler);
  body.addEventListener('contextmenu', rightClickHandler);
});

thirdPromise.then((message) => showNotification('success', message));

function showNotification(className, message) {
  notificationDiv.textContent = message;
  notificationDiv.classList.add(className);

  setTimeout(() => {
    notificationDiv.classList.remove(className);
    notificationDiv.textContent = '';
  }, 3000);
}
