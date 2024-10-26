'use strict';

const body = document.querySelector('body');

const success = 'success';
const error = 'error';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', function handleClick() {
    resolve('First promise was resolved');
    document.removeEventListener('click', handleClick);
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((message) => {
    createNotification(success, message);
  })
  .catch((errorMsg) => {
    createNotification(error, errorMsg);
  });

function createNotification(type, message) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add(type);
  notification.innerText = message;
  body.appendChild(notification);
}

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', function handleClick() {
    resolve('Second promise was resolved');
    document.removeEventListener('click', handleClick);
  });

  document.addEventListener('contextmenu', function handleClick(e) {
    e.preventDefault();
    resolve('Second promise was resolved');
    document.removeEventListener('contextmenu', handleClick);
  });
});

secondPromise.then((message) => {
  createNotification(success, message);
});

const thirdPromise = new Promise((resolve) => {
  let countLeftClick = false;
  let countRightClick = false;

  document.addEventListener('click', function handleClick() {
    countLeftClick = true;
    document.removeEventListener('click', handleClick);

    if (countLeftClick && countRightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', function handleClick(e) {
    e.preventDefault();
    countRightClick = true;
    document.removeEventListener('contextmenu', handleClick);

    if (countLeftClick && countRightClick) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((message) => {
  createNotification(success, message);
});
