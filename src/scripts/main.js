'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve({ message: 'First promise was resolved', className: 'success' });
  });

  setTimeout(() => {
    reject({ message: 'First promise was rejected', className: 'error' });
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', () => {
    resolve({ message: 'Second promise was resolved', className: 'success' });
  });
});

const thirdPromise = new Promise((resolve) => {
  let count = 0;
  let isNotPushLeft = true;
  let isNotPushRight = true;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 && isNotPushLeft) {
      count++;
      isNotPushLeft = false;
    }

    if (e.button === 2 && isNotPushRight) {
      count++;
      isNotPushRight = false;
    }

    if (count === 2) {
      resolve({ message: 'Third promise was resolved', className: 'success' });
    }
  });
});

function handleErrorOrSuccess({ message, className }) {
  const divItem = document.createElement('div');

  divItem.dataset.qa = 'notification';
  divItem.classList.add(className);
  divItem.textContent = message;
  document.body.append(divItem);
}

firstPromise.then(handleErrorOrSuccess).catch(handleErrorOrSuccess);
secondPromise.then(handleErrorOrSuccess).catch(handleErrorOrSuccess);
thirdPromise.then(handleErrorOrSuccess).catch(handleErrorOrSuccess);
