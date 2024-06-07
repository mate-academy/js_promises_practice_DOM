'use strict';

const notificationHandler = (setClass, message) => {
  const notificationElement = document.createElement('div');

  notificationElement.classList.add(setClass);
  notificationElement.textContent = message;
  notificationElement.setAttribute('data-qa', 'notification');
  document.body.append(notificationElement);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was rejected');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise.catch((response) => {
  notificationHandler('error', response.message);
});

firstPromise.then((response) => {
  notificationHandler('success', response);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

secondPromise.then((response) => {
  notificationHandler('success', response);
});

const thirdPromise = new Promise((resolve, reject) => {
  let rightClick = false;
  let leftClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((response) => {
  notificationHandler('success', response);
});
