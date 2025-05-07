'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(reject, 3000, 'First promise was rejected');
});

const secondPromise = new Promise((resolve, reject) => {
  const onClick = () => {
    resolve('Second promise was resolved');

    document.removeEventListener('click', onClick);
    document.removeEventListener('contextmenu', onClick);
  };

  document.addEventListener('click', onClick);
  document.addEventListener('contextmenu', onClick);
});

const thirdPromise = new Promise((resolve, reject) => {
  let isLeftClicked = false;
  let isRightClicked = false;

  function onLeftClick() {
    isLeftClicked = true;

    if (isRightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', onLeftClick);
      document.removeEventListener('click', onRightClick);
    }
  }

  function onRightClick() {
    isRightClicked = true;

    if (isLeftClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', onLeftClick);
      document.removeEventListener('click', onRightClick);
    }
  }

  document.addEventListener('click', onLeftClick);
  document.addEventListener('contextmenu', onRightClick);
});

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler).catch(errorHandler);
thirdPromise.then(successHandler).catch(errorHandler);

function successHandler(message) {
  const messageElement = document.createElement('div');

  messageElement.classList.add('success');
  messageElement.dataset.qa = 'notification';
  messageElement.textContent = message;

  document.body.append(messageElement);
}

function errorHandler(message) {
  const messageElement = document.createElement('div');

  messageElement.classList.add('error');
  messageElement.dataset.qa = 'notification';
  messageElement.textContent = message;

  document.body.append(messageElement);
}
