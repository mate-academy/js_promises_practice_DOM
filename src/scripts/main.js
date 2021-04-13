'use strict';

const promiseContainer = document.createElement('div');

promiseContainer.className = 'container';
document.body.append(promiseContainer);

const createNotification = (message, classN) => {
  const element = document.createElement('div');

  element.textContent = message;
  element.className = classN;
  element.dataset.qa = 'notification';
  promiseContainer.append(element);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then(result => createNotification(result, 'success'))
  .catch(error => createNotification(error, 'warning'));

const secondPromise = new Promise(resolve => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise.then(result => createNotification(result, 'success'));

const thirdPromise = new Promise(resolve => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', e => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then(result => createNotification(result, 'success'));
