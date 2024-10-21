'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

let leftClick = false;
let rightClick = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
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
  .then((value) => {
    const message = document.createElement('div');

    message.classList.add('success');
    message.setAttribute('data-qa', 'notification');
    message.textContent = value;

    document.body.appendChild(message);
  })
  .catch((error) => {
    const message = document.createElement('div');

    message.classList.add('error');
    message.setAttribute('data-qa', 'notification');
    message.textContent = error;

    document.body.appendChild(message);
  });

secondPromise.then((value) => {
  const message = document.createElement('div');

  message.classList.add('success');
  message.setAttribute('data-qa', 'notification');
  message.textContent = value;

  document.body.appendChild(message);
});

thirdPromise.then((value) => {
  const message = document.createElement('div');

  message.classList.add('success');
  message.setAttribute('data-qa', 'notification');
  message.textContent = value;

  document.body.appendChild(message);
});

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});
