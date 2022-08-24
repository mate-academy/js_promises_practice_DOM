'use strict';

let leftClick;
let rightClick;

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', () => {
    leftClick = true;
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('mousedown', (e) => {
    switch (e.button) {
      case 0:
        leftClick = true;
        break;

      case 2:
        rightClick = true;
        break;
    }
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('mousedown', (e) => {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

const successHandler = (successMessage) => {
  const message = document.createElement('div');

  message.className = 'success';
  message.dataset.qa = 'notification';
  message.innerText = successMessage;
  document.body.append(message);
};

const errorHandler = (errorMessage) => {
  const message = document.createElement('div');

  message.className = 'warning';
  message.dataset.qa = 'notification';
  message.innerText = errorMessage;
  document.body.append(message);
};

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler);
thirdPromise.then(successHandler);
