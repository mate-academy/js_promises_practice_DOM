'use strict';

const promiseMessage = (notification, type) => {
  const message = document.createElement('div');
  const p = document.createElement('p');

  message.className = type;
  p.textContent = notification;
  p.setAttribute('data-qa', 'notification');

  message.append(p);
  document.body.append(message);
};

function firstPromise() {
  const resolver = (resolve, reject) => {
    document.addEventListener('mousedown', (e) => {
      resolve('First promise was resolved');
    });

    setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);
  };

  return new Promise(resolver);
}

function secondPromise() {
  const resolver = (resolve) => {
    document.addEventListener('mousedown', (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve('Second promise was resolved');
      }
    });
  };

  return new Promise(resolver);
}

function thirdPromise() {
  const resolver = (resolve) => {
    let leftClick;
    let rightClick;

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
      };
    });
  };

  return new Promise(resolver);
}

const promise1 = firstPromise();
const promise2 = secondPromise();
const promise3 = thirdPromise();

promise1
  .then(result => promiseMessage(result, 'success'))
  .catch(error => promiseMessage(error, 'warning'));

promise2
  .then(result => promiseMessage(result, 'success'));

promise3
  .then(result => promiseMessage(result, 'success'));
