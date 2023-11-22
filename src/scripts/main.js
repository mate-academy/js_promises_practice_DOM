'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mouseup', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});

firstPromise
  .then(message => {
    appendMessage(message);
  })
  .catch(value => {
    appendErrorMessage(value);
  });

const secondPromise = new Promise((resolve) => {
  secondClick(resolve);
});

secondPromise
  .then(message => {
    appendMessage(message);
  });

function secondClick(resolve) {
  document.addEventListener('mouseup', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
}

const thirdPromise = new Promise((resolve) => {
  thirdClick(resolve);
});

thirdPromise
  .then(message => {
    appendMessage(message);
  });

function thirdClick(resolve) {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mouseup', (e) => {
    if (e.button === 2) {
      rightClick = true;
      checkAndResolve();
    }

    if (e.button === 0) {
      leftClick = true;
    }

    checkAndResolve();
  });

  function checkAndResolve() {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  }
}

function appendMessage(message) {
  const messageDiv = document.createElement('div');

  messageDiv.setAttribute('data-qa', 'notification');
  messageDiv.className = 'message success';
  messageDiv.textContent = message;
  document.body.appendChild(messageDiv);
}

function appendErrorMessage(error) {
  const errorMessageDiv = document.createElement('div');

  errorMessageDiv.setAttribute('data-qa', 'notification');
  errorMessageDiv.className = 'message warning';
  errorMessageDiv.textContent = error;
  document.body.appendChild(errorMessageDiv);
}
