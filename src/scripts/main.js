'use strict';

let leftClick = false;
let rightClick = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  function checkBothClicks() {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClick = true;
      checkBothClicks();
    } else if (e.button === 2) {
      rightClick = true;
      checkBothClicks();
    }
  });
});

function handleSuccess(message) {
  const successDiv = document.createElement('div');

  successDiv.className = 'notification success';
  successDiv.textContent = message;
  successDiv.setAttribute('data-qa', 'notification');
  document.body.appendChild(successDiv);
}

function handleError(message) {
  const errorDiv = document.createElement('div');

  errorDiv.className = 'notification error';
  errorDiv.textContent = message;
  errorDiv.setAttribute('data-qa', 'notification');
  document.body.appendChild(errorDiv);
}

firstPromise.then(handleSuccess).catch(handleError);
secondPromise.then(handleSuccess);
thirdPromise.then(handleSuccess);

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});
