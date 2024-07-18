'use strict';

const handleErrorOrSuccess = (message, type) => {
  const divElement = document.createElement('div');

  divElement.dataset.qa = 'notification';
  divElement.classList.add(type);
  divElement.textContent = message;

  document.body.append(divElement);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    e.preventDefault();

    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    e.preventDefault();

    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  function checkHandleButtons() {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', () => {
    leftClick = true;

    checkHandleButtons();
  });

  document.addEventListener('contextmenu', (e) => {
    rightClick = true;

    checkHandleButtons();
  });
});

firstPromise
  .then((value) => handleErrorOrSuccess(value, 'success'))
  .catch((value) => handleErrorOrSuccess(value.message, 'error'));

secondPromise.then((value) => handleErrorOrSuccess(value, 'success'));
thirdPromise.then((value) => handleErrorOrSuccess(value, 'success'));
