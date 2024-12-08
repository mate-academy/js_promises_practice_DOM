'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  // eslint-disable-next-line no-shadow
  const onLeftClick = (event) => {
    if (event.button === 0) {
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('click', onLeftClick);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  // eslint-disable-next-line no-shadow

  document.addEventListener('click', (ev) => {
    if (ev.button === 0) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let isLeftClicked = false;
  let isRightClicked = false;

  const onBothClick = () => {
    if (isLeftClicked && isRightClicked) {
      resolve('Third promise was resolved');
      isLeftClicked = false;
      isRightClicked = false;
    }
  };

  document.addEventListener('click', () => {
    isLeftClicked = true;
    onBothClick();
  });

  // eslint-disable-next-line no-shadow
  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    isRightClicked = true;
    onBothClick();
  });
});

const success = (message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'success';
  div.textContent = message;

  body.append(div);
};

const errorHandler = (message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'error';
  div.textContent = message;

  body.append(div);
};

firstPromise
  .then((message) => success(message))
  .catch((error) => errorHandler(error.message));

secondPromise.then((message) => success(message));

thirdPromise.then((message) => success(message));
