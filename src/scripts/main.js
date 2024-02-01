'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (events) => {
    if (events.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (events) => {
    if (events.button === 0 || events.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (events) => {
    if (events.button === 0) {
      leftClick = true;
    }

    if (events.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolve');
    }
  });
});

const success = (text) => {
  const divElement = document.createElement('div');

  divElement.className = 'success';
  divElement.innerText = text;
  divElement.dataset.qa = 'notification';
  document.body.appendChild(divElement);
};

const fail = (error) => {
  const divElement = document.createElement('div');

  divElement.className = 'warning';
  divElement.innerText = error.message;
  divElement.dataset.qa = 'notification';
  document.body.appendChild(divElement);
};

firstPromise
  .then(success)
  .catch(fail);

secondPromise
  .then(success);

thirdPromise
  .then(success);

document.addEventListener('contextmenu', (rightClick) => {
  rightClick.preventDefault();
});
