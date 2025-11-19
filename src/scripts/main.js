'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', (eve) => {
    if (eve.button === 0) {
      clearTimeout(timerId);
      resolve('First promise was resolved');
    }
  });

  const timerId = setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('click', (eve) => {
    if (eve.button === 0 || eve.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const promise3 = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', (eve) => {
    if (eve.button === 0) {
      leftClicked = true;
    }

    if (eve.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

promise1
  .then((message) => {
    success(message);
  })
  .catch((message) => {
    error(message);
  });

promise2
  .then((message) => {
    success(message);
  })
  .catch(() => {
    error('Second promise was rejected');
  });

promise3
  .then((message) => {
    success(message);
  })
  .catch(() => {
    error('Third promise was rejected');
  });

function success(text) {
  const message = document.createElement('div');

  message.classList.add('success');
  message.setAttribute('data-qa', 'notification');
  message.textContent = text;
  document.querySelector('body').append(message);
}

function error(text) {
  const message = document.createElement('div');

  message.classList.add('error');
  message.setAttribute('data-qa', 'notification');
  message.textContent = text;
  document.querySelector('body').append(message);
}
