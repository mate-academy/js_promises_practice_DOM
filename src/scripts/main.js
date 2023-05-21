'use strict';

const body = document.querySelector('body');
const message = document.createElement('div');

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then(result => {
    message.setAttribute('data-qa', 'notification');
    message.className = 'success';
    message.innerText = result;
    body.append(message);
  })
  .catch(error => {
    message.setAttribute('data-qa', 'notification');
    message.className = 'warning';
    message.innerText = error;
    body.append(message);
  });

const secondPromise = new Promise((resolve) => {
  body.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise
  .then(result => {
    message.setAttribute('data-qa', 'notification');
    message.className = 'success';
    message.innerText = result;
    body.append(message);
  })
  .catch(null);

const thirdPromise = new Promise((resolve) => {
  let leftBtn = false;
  let rightBtn = false;

  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftBtn = true;

      if (leftBtn && rightBtn) {
        resolve('Third promise was resolved');
      }
    }
  });

  body.addEventListener('mousedown', (e) => {
    if (e.button === 2) {
      rightBtn = true;

      if (leftBtn && rightBtn) {
        resolve('Third promise was resolved');
      }
    }
  });
});

thirdPromise
  .then(result => {
    message.setAttribute('data-qa', 'notification');
    message.className = 'success';
    message.innerText = result;
    body.append(message);
  });
