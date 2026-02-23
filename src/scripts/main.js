'use strict';

let leftClick = false;
let rightClick = false;

const showNotification = (message, type) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(type);
  div.textContent = message;
  document.body.appendChild(div);
};

const clear = (onLeftClick, onRightClick) => {
  document.removeEventListener('click', onLeftClick);
  document.removeEventListener('contextmenu', onRightClick);
};

const firstPromise = new Promise((resolve, reject) => {
  const successMessage = 'First promise was resolved';
  const errorMessage = 'First promise was rejected';

  const onLeftClick = () => {
    leftClick = true;
    clearTimeout(timeoutId);
    resolve(successMessage);
    document.removeEventListener('click', onLeftClick);
  };

  const timeoutId = setTimeout(() => {
    reject(errorMessage);
    document.removeEventListener('click', onLeftClick);
  }, 3000);

  document.addEventListener('click', onLeftClick);
});

const secondPromise = new Promise((resolve) => {
  const successMessage = 'Second promise was resolved';

  const onLeftClick = (ev) => {
    if (ev.button === 0) {
      leftClick = true;
      resolve(successMessage);
      clear(onLeftClick, onRightClick);
    }
  };

  const onRightClick = (ev) => {
    if (ev.button === 2) {
      rightClick = true;
      resolve(successMessage);
      clear(onLeftClick, onRightClick);
    }
  };

  document.addEventListener('click', onLeftClick);
  document.addEventListener('contextmenu', onRightClick);
});

const thirdPromise = new Promise((resolve) => {
  const successMessage = 'Third promise was resolved';

  const onLeftClick = (ev) => {
    if (ev.button === 0) {
      leftClick = true;

      if (leftClick && rightClick) {
        resolve(successMessage);
        clear(onLeftClick, onRightClick);
      }
    }
  };

  const onRightClick = (ev) => {
    if (ev.buttons === 2) {
      rightClick = true;

      if (leftClick && rightClick) {
        resolve(successMessage);
        clear(onLeftClick, onRightClick);
      }
    }
  };

  document.addEventListener('click', onLeftClick);
  document.addEventListener('contextmenu', onRightClick);
});

firstPromise
  .then((message) => showNotification(message, 'success'))
  .catch((errorMessage) => showNotification(errorMessage, 'error'));

secondPromise
  .then((message) => showNotification(message, 'success'))
  .catch((errorMessage) => showNotification(errorMessage, 'error'));

thirdPromise
  .then((message) => showNotification(message, 'success'))
  .catch((errorMessage) => showNotification(errorMessage, 'error'));
