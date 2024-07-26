'use strict';

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.querySelector('html').addEventListener('click', () => {
    resolve(`First promise was resolved`);
  });
});

const secondPromise = new Promise((resolve) => {
  document.querySelector('html').addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.querySelector('html').addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let RightClicked = false;
  let LeftClicked = false;

  document.querySelector('html').addEventListener('click', () => {
    LeftClicked = true;

    if (RightClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    RightClicked = true;

    if (LeftClicked) {
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
