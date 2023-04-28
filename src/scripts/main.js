'use strict';

const handlerFunction = (text, classIn) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = classIn;
  div.textContent = text;

  document.body.append(div);
};

let leftClick = false;
let rightClick = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', e => {
    if (e.button === 0 || e.button === 2) {
      return resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', e => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(result => {
    handlerFunction(result, 'success');
  })
  .catch(error => {
    handlerFunction(error, 'warning');
  });

secondPromise
  .then(result => {
    handlerFunction(result, 'success');
  });

thirdPromise
  .then(result => {
    handlerFunction(result, 'success');
  });
