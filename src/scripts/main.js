'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', e => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise(resolve => {
  body.addEventListener('mousedown', e => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise(resolve => {
  let leftButton = false;
  let rightButton = false;

  body.addEventListener('mousedown', e => {
    if (e.button === 0) {
      leftButton = true;
    } else if (e.button === 2) {
      rightButton = true;
    }

    if (leftButton && rightButton) {
      resolve('Third promise was resolved');
    }
  });
});

function message(text, className) {
  const div = document.createElement('div');

  div.textContent = text;
  div.classList.add(className);
  div.setAttribute('data-qa', 'notification');
  body.append(div);
};

firstPromise
  .then(result => {
    message(result, 'success');
  })
  .catch(error => {
    message(error.message, 'warning');
  });

secondPromise
  .then(result => {
    message(result, 'success');
  });

thirdPromise
  .then(result => {
    message(result, 'success');
  });
