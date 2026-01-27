'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    resolve();
  });

  setTimeout(reject, 3000);
});

firstPromise
  .then(() => {
    createNotification('First promise was resolved', 'success');
  })
  .catch(() => {
    createNotification('First promise was rejected', 'error');
  });

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    const button = e.button;

    if (button === 0 || button === 2) {
      resolve();
    }
  });
});

secondPromise.then(() => {
  createNotification('Second promise was resolved', 'success');
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
      resolve();
    }
  });
});

thirdPromise.then(() => {
  createNotification('Third promise was resolved', 'success');
});

function createNotification(message, type) {
  const div = document.createElement('div');

  div.classList.add(type);
  div.dataset.qa = 'notification';
  div.textContent = message;

  document.body.append(div);
}
