'use strict';

let leftButton;
let rightButton;

document.body.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftButton = true;
    }

    if (e.button === 2) {
      rightButton = true;
    }

    if (leftButton || rightButton) {
      resolve('Second promise was resolved');
    };
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('mousedown', () => {
    if (leftButton && rightButton) {
      resolve('Third promise was resolved');
    };
  });
});

const createMessage = (text, type) => {
  const div = document.createElement('div');

  div.innerText = text;
  div.className = `${type}`;
  div.dataset.qa = 'notification';

  document.body.append(div);
};

firstPromise
  .then((value) => {
    createMessage(value, 'success');
  })
  .catch((value) => {
    createMessage(value, 'warning');
  });

secondPromise
  .then((value) => {
    createMessage(value, 'success');
  });

thirdPromise
  .then((value) => {
    createMessage(value, 'success');
  });
