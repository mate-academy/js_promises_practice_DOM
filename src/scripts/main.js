'use strict';

const bodyEl = document.body;

function showMessage(text, type) {
  const messageEl = document.createElement('div');

  messageEl.dataset.qa = 'notification';
  messageEl.classList.add(`${type}`);
  messageEl.textContent = text;
  bodyEl.append(messageEl);
}

function onSuccess(text) {
  showMessage(text, 'success');
}

function onError(text) {
  showMessage(text, 'error');
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((text) => onSuccess(text))
  .catch((error) => onError(error.message));

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

secondPromise.then((text) => onSuccess(text)).catch((text) => onError(text));

const thirdPromise = new Promise((resolve) => {
  let leftButtonClicked = false;
  let rightButtonClicked = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftButtonClicked = true;
    }

    if (leftButtonClicked && rightButtonClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    rightButtonClicked = true;

    if (leftButtonClicked && rightButtonClicked) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((text) => onSuccess(text)).catch((text) => onError(text));

document.addEventListener('contextmenu', (e) => e.preventDefault());
