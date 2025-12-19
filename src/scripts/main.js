'use strict';

function showSuccess(message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = 'success';
  div.textContent = message;
  document.body.appendChild(div);
}

function showError(message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = 'error';
  div.textContent = message;

  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  function onClick(events) {
    if (events.button === 0) {
      clearTimeout(timerId);
      document.removeEventListener('click', onClick);
      resolve('First promise was resolved');
    }
  }

  document.addEventListener('click', onClick);
});

const secondPromise = new Promise((resolve) => {
  function onClick(events) {
    if (events.button === 0 || events.button === 2) {
      document.removeEventListener('click', onClick);
      resolve('Second promise was resolved');
    }
  }

  document.addEventListener('click', onClick);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  function onClick(events) {
    if (events.button === 0) {
      leftClicked = true;
    }

    if (events.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      document.removeEventListener('click', onClick);

      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', onClick);
});

firstPromise.then(showSuccess).catch((err) => showError(err.message));
secondPromise.then(showSuccess);
thirdPromise.then(showSuccess);
