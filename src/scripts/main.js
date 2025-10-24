/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-shadow */
'use strict';

document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  document.addEventListener('mousedown', (event) => {
    if (event.button === 0 && !clicked) {
      clicked = true;
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    if (!clicked) {
      reject('First promise was rejected');
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (event) => {
    if (event.button === 0 || event.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

// ---------- THIRD PROMISE ----------
const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
      leftClicked = true;
    }

    if (event.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

const handleSuccess = (message) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = 'success';
  div.textContent = message;
  document.body.append(div);
};

const handleError = (message) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = 'error';
  div.textContent = message;
  document.body.append(div);
};

firstPromise.then(handleSuccess).catch(handleError);
secondPromise.then(handleSuccess).catch(handleError);
thirdPromise.then(handleSuccess).catch(handleError);
