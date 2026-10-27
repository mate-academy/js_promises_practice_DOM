'use strict';

const REJECT_DELAY = 3000;

function notification(data, className) {
  const block = document.createElement('div');

  block.classList.add(className);
  block.dataset.qa = 'notification';
  block.textContent = data;

  document.querySelector('body').append(block);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, REJECT_DELAY);
});

const secondPromise = new Promise((resolve) => {
  const onAnyClick = () => resolve('Second promise was resolved');

  document.addEventListener('click', onAnyClick);
  document.addEventListener('contextmenu', onAnyClick);
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const checkBothClicks = () => {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', () => {
    leftClick = true;
    checkBothClicks();
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;
    checkBothClicks();
  });
});

const onSuccess = (message) => notification(message, 'success');
const onError = (error) => notification(error.message, 'error');

firstPromise.then(onSuccess, onError);
secondPromise.then(onSuccess, onError);
thirdPromise.then(onSuccess, onError);
