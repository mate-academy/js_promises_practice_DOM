'use strict';

const createMessageBlock = (message, statusClass) => {
  document.body.insertAdjacentHTML('beforeend',
    `<div class="${statusClass}" data-qa="notification">${message}</div>`);
};

const onSuccess = (message) => {
  createMessageBlock(message, 'success');
};

const onError = (message) => {
  createMessageBlock(message, 'warning');
};

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    const mouseButton = e.button;

    if (mouseButton === 0 || mouseButton === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    switch (e.button) {
      case 0:
        leftClick = true;
        break;
      case 2:
        rightClick = true;
        break;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(onSuccess)
  .catch(onError);

secondPromise
  .then(onSuccess)
  .catch(onError);

thirdPromise
  .then(onSuccess)
  .catch(onError);
