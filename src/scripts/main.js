'use strict';

function createMessage(className, message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = `${className}`;
  div.textContent = `${message}`;

  document.body.insertAdjacentElement('beforeend', div);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (ev) => {
    if (ev.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (ev) => {
    if (ev.button === 0 || ev.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let LeftKey = false;
  let RightKey = false;

  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0) {
      LeftKey = true;
    }

    if (ev.button === 2) {
      RightKey = true;
    }

    if (LeftKey && RightKey) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(result => {
    createMessage('success', result);
  })
  .catch(result => {
    createMessage('warning', result);
  });

secondPromise
  .then(result => {
    createMessage('success', result);
  });

thirdPromise
  .then(result => {
    createMessage('success', result);
  });
