'use strict';

let removeTimerId;

function notify(message, type) {
  let div = document.querySelector('div[data-qa="notification"]');

  if (!div) {
    div = document.createElement('div');
    div.dataset.qa = 'notification';
    document.body.appendChild(div);
  }

  div.className = type;
  div.textContent = message;

  // якщо вже є активний таймер — прибираємо його
  if (removeTimerId) {
    clearTimeout(removeTimerId);
  }

  removeTimerId = setTimeout(() => {
    div.remove();
    removeTimerId = null;
  }, 4000);
}

// 1
const firstPromise = new Promise((resolve, reject) => {
  // eslint-disable-next-line no-shadow
  const clickHandler = (event) => {
    if (event.button === 0) {
      resolve('First promise was resolved');
      document.removeEventListener('mousedown', clickHandler);
      clearTimeout(timeoutId);
    }
  };

  document.addEventListener('mousedown', clickHandler);

  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('mousedown', clickHandler);
  }, 3000);
});

firstPromise
  .then((message) => notify(message, 'success'))
  .catch((error) => notify(error.message, 'error'));

// 2
const secondPromise = new Promise((resolve) => {
  // eslint-disable-next-line no-shadow
  const clickHandler = (event) => {
    if (event.button === 0 || event.button === 2) {
      if (event.button === 2) {
        event.preventDefault();
      } // блокуємо контекстне меню
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', clickHandler);
    }
  };

  document.addEventListener('mousedown', clickHandler);
});

secondPromise
  .then((message) => notify(message, 'success'))
  .catch((error) => notify(error.message, 'error'));

// 3
const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  // eslint-disable-next-line no-shadow
  const clickHandler = (event) => {
    if (event.button === 0) {
      leftClicked = true;
    }

    if (event.button === 2) {
      event.preventDefault(); // блокуємо контекстне меню
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', clickHandler);
    }
  };

  document.addEventListener('mousedown', clickHandler);
});

thirdPromise
  .then((message) => notify(message, 'success'))
  .catch((error) => notify(error.message, 'error'));
