'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (ev) => {
    if (ev.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0 || ev.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0) {
      leftClicked = true;
    }

    if (ev.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

const renderSuccess = (message) => {
  const success = document.createElement('div');

  success.className = 'success';
  success.setAttribute('data-qa', 'notification');
  success.innerText = message;
  document.body.appendChild(success);
};

const renderError = (message) => {
  const error = document.createElement('div');

  error.className = 'error';
  error.setAttribute('data-qa', 'notification');
  error.innerText = message;
  document.body.appendChild(error);
};

firstPromise.then(renderSuccess).catch(renderError);
secondPromise.then(renderSuccess).catch(renderError);
thirdPromise.then(renderSuccess).catch(renderError);
