'use strict';

function createMessage(message, type) {
  const div = document.createElement('div');

  div.classList.add(type);
  div.dataset.qa = 'notification';
  div.innerText = message;

  document.body.append(div);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise(resolve => {
  document.addEventListener('mousedown', e => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise(resolve => {
  document.addEventListener('contextmenu', e => {
    e.preventDefault();
  });

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

firstPromise
  .then(result => createMessage(result, 'success'))
  .catch(result => createMessage(result, 'warning'));

secondPromise
  .then(result => createMessage(result, 'success'));

thirdPromise
  .then(result => createMessage(result, 'success'));
