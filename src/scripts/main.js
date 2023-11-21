'use strict';

const firstPromise = () => {
  return new Promise((resolve, reject) => {
    document.addEventListener('click', () => {
      resolve('First promise was resolved');
    });

    setTimeout(() => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected');
    }, 3000);
  });
};

firstPromise()
  .then(message => {
    appendMessage(message);
  })
  .catch(value => {
    appendErrorMessage(value);
  });

const secondPromise = () => {
  return new Promise((resolve) => {
    secondClick(resolve);
  });
};

secondPromise()
  .then(message => {
    appendMessage(message);
  });

function secondClick(resolve) {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
}

const thirdPromise = () => {
  return new Promise((resolve) => {
    thirdClick(resolve);
  });
};

thirdPromise()
  .then(message => {
    appendMessage(message);
  });

function thirdClick(resolve) {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;
    checkAndResolve();
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;
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
  messageDiv.className = 'message';
  messageDiv.textContent = message;
  document.body.appendChild(messageDiv);
}

function appendErrorMessage(error) {
  const errorMessageDiv = document.createElement('div');

  errorMessageDiv.setAttribute('data-qa', 'notification');
  errorMessageDiv.className = 'message error-message';
  errorMessageDiv.textContent = error;
  document.body.appendChild(errorMessageDiv);
}
