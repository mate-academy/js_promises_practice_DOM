'use strict';

let leftClickDetected = false;
let rightClickDetected = false;

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected in 3 seconds'));
  }, 3000);

  document.body.addEventListener('click', (ev) => {
    if (ev.button === 0) {
      clearTimeout(timer);
      leftClickDetected = true;
      resolve('First promise was resolved on a left click in the document');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  document.body.addEventListener('click', (ev) => {
    if (ev.button === 0) {
      leftClickDetected = true;
      resolve('Second promise was resolved');
    }
  });

  document.body.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    rightClickDetected = true;

    if (leftClickDetected || rightClickDetected) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  document.body.addEventListener('click', (ev) => {
    if (ev.button === 0) {
      leftClickDetected = true;
    }

    if (leftClickDetected && rightClickDetected) {
      resolve('Third promise was resolved!');
    }
  });

  document.body.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    rightClickDetected = true;

    if (leftClickDetected && rightClickDetected) {
      resolve('Third promise was resolved!');
    }
  });
});

const handleSuccess = (message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'success';
  div.textContent = message;
  document.body.append(div);
};

const handleError = (error) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'error';

  const errorMessage = error instanceof Error ? error.message : error;

  div.textContent = errorMessage;
  document.body.append(div);
};

firstPromise
  .then((message) => handleSuccess(message))
  .catch((error) => handleError(error));

secondPromise
  .then((message) => handleSuccess(message))
  .catch((error) => handleError(error));

thirdPromise
  .then((message) => handleSuccess(message))
  .catch((error) => handleError(error));
