'use strict';

document.addEventListener('contextmenu', (rightClick) => {
  rightClick.preventDefault();
});

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (mouseEvent) => {
    if (mouseEvent.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (mouseEvent) => {
    if (mouseEvent.button === 0 || mouseEvent.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftButton = false;
  let rightButton = false;

  document.addEventListener('mousedown', (mouseEvent) => {
    if (mouseEvent.button === 0) {
      leftButton = true;
    }

    if (mouseEvent.button === 2) {
      rightButton = true;
    }

    if (leftButton && rightButton) {
      resolve('Third promise was resolve');
    }
  });
});

const onSuccess = (message) => {
  const divElement = document.createElement('div');

  divElement.className = 'success';
  divElement.innerText = message;
  divElement.dataset.qa = 'notification';
  document.body.appendChild(divElement);
};

const onFail = (error) => {
  const divElement = document.createElement('div');

  divElement.className = 'warning';
  divElement.innerText = error.message;
  divElement.dataset.qa = 'notification';
  document.body.appendChild(divElement);
};

firstPromise
  .then(onSuccess)
  .catch(onFail);

secondPromise
  .then(onSuccess)
  .catch(onFail);

thirdPromise
  .then(onSuccess)
  .catch(onFail);
