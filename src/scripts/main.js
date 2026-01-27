'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((message) => {
    createNotification(message, 'success');
  })
  .catch((error) => {
    createNotification(error.message, 'error');
  });

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    const button = e.button;

    if (button === 0 || button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise.then((message) => {
  createNotification(message, 'success');
});

const thirdPromise = new Promise((resolve, reject) => {
  const pressed = {
    0: false,
    2: false,
  };

  document.addEventListener('mousedown', (e) => {
    const button = e.button;

    if (button in pressed) {
      pressed[button] = true;
    }

    if (pressed[0] && pressed[2]) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((message) => {
  createNotification(message, 'success');
});

function createNotification(message, type) {
  const div = document.createElement('div');

  div.classList.add(type);
  div.dataset.qa = 'notification';
  div.textContent = message;

  document.body.append(div);
}
