'use strict';

const body = document.querySelector('body');

let leftClickHappened = false;
let rightClickHappened = false;

const firstPromise = new Promise(function (resolve, reject) {
  let clicked = false;

  document.addEventListener('click', (e) => {
    clicked = true;
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    if (!clicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise(function (resolve, reject) {
  document.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise(function (resolve, reject) {
  document.addEventListener('click', (e) => {
    leftClickHappened = true;

    if (leftClickHappened && rightClickHappened) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    rightClickHappened = true;

    if (leftClickHappened && rightClickHappened) {
      resolve('Third promise was resolved');
    }
  });
});

const successHandler = (value) => {
  const message = document.createElement('div');

  message.innerText = value;
  message.dataset.qa = 'notification';
  message.className = 'success';

  body.append(message);
};

const errorHandler = (reason) => {
  const message = document.createElement('div');

  message.innerText = reason;
  message.dataset.qa = 'notification';
  message.className = 'error';

  body.append(message);
};

firstPromise
  .then((value) => successHandler(value))
  .catch((reason) => errorHandler(reason));

secondPromise
  .then((value) => successHandler(value))
  .catch((reason) => errorHandler(reason));

thirdPromise
  .then((value) => successHandler(value))
  .catch((reason) => errorHandler(reason));
