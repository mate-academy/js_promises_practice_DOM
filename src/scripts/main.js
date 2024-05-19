/* eslint-disable prefer-promise-reject-errors */
'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject('First promise was rejected');
  }, 3000);

  document.addEventListener('click', (e) => {
    clearTimeout(timer);
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve, reject) => {
  const resolveText = 'Second promise was resolved';

  document.addEventListener('click', (e) => {
    resolve(resolveText);
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve(resolveText);
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;
  const resolveText = 'Third promise was resolved';

  document.addEventListener('click', () => {
    if (rightClick) {
      resolve(resolveText);
    }

    leftClick = true;
  });

  document.addEventListener('contextmenu', () => {
    if (leftClick) {
      resolve(resolveText);
    }

    rightClick = true;
  });
});

const successHandler = (message) => {
  const div = document.createElement('div');

  div.className = 'success';
  div.dataset.qa = 'notification';
  div.textContent = message;
  document.body.appendChild(div);
};

const errorHandler = (message) => {
  const div = document.createElement('div');

  div.className = 'error';
  div.dataset.qa = 'notification';
  div.textContent = message;
  document.body.appendChild(div);
};

firstPromise
  .then((message) => successHandler(message))
  .catch((message) => errorHandler(message));

secondPromise
  .then((message) => successHandler(message))
  .catch((message) => errorHandler(message));

thirdPromise
  .then((message) => successHandler(message))
  .catch((message) => errorHandler(message));
