'use strict';

let rightButtonClicked = false;
let leftButtonClicked = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    leftButtonClicked = true;
    resolve('First promise was resolved');
  });

  if (!leftButtonClicked) {
    setTimeout(() => {
      // eslint-disable-next-line
      reject(`First promise was rejected`);
    }, 3000);
  }
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftButtonClicked = true;
    }

    if (e.button === 2) {
      rightButtonClicked = true;
    }

    if (rightButtonClicked && leftButtonClicked) {
      resolve('Third promise was resolved');
    }
  });
});

const successHandler = (message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'message';
  div.textContent = message;
  document.body.appendChild(div);
};

const errorHandler = (message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'message error-message';
  div.textContent = message;
  document.body.appendChild(div);
};

firstPromise.then(successHandler).catch(errorHandler);

secondPromise.then(successHandler).catch(errorHandler);

thirdPromise.then(successHandler).catch(errorHandler);
