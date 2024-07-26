'use strict';

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.querySelector('html').addEventListener('click', () => {
    resolve(`First promise was resolved`);
  });
});

const secondPromise = new Promise((resolve, reject) => {
  document.querySelector('html').addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.querySelector('html').addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let isRightClicked = false;
  let isLeftClicked = false;

  document.querySelector('html').addEventListener('click', () => {
    isLeftClicked = true;

    if (isRightClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.querySelector('html').addEventListener('contextmenu', (e) => {
    e.preventDefault();
    isRightClicked = true;

    if (isLeftClicked) {
      resolve('Third promise was resolved');
    }
  });
});

function successHandler(message) {
  notificationCreator(message, 'success');
}

function errorHandler(message) {
  notificationCreator(message, 'error');
}

function notificationCreator(text, type) {
  const newDiv = document.createElement('div');

  newDiv.classList.add(type);
  newDiv.textContent = text;
  newDiv.setAttribute('data-qa', 'notification');
  document.querySelector('body').appendChild(newDiv);
}

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler).catch(errorHandler);
thirdPromise.then(successHandler);
