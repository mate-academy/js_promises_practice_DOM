'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const firstEvent = () => {
    clearTimeout(timer);

    resolve('First promise was resolved');
  };

  const timer = setTimeout(() => {
    document.removeEventListener('click', firstEvent);

    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', firstEvent);
});

firstPromise
  .then((message) => {
    createNotification(message, 'success');
  })
  .catch((error) => {
    createNotification(error.message, 'error');
  });

const secondPromise = new Promise((resolve, reject) => {
  const secondEvent = (e) => {
    const button = e.button;

    if (button === 0 || button === 2) {
      resolve('Second promise was resolved');

      document.removeEventListener('mousedown', secondEvent);
    }
  };

  document.addEventListener('mousedown', secondEvent);
});

secondPromise.then((message) => {
  createNotification(message, 'success');
});

const thirdPromise = new Promise((resolve, reject) => {
  const pressed = {
    0: false,
    2: false,
  };

  const thirdEvent = (e) => {
    const button = e.button;

    if (button in pressed) {
      pressed[button] = true;
    }

    if (pressed[0] && pressed[2]) {
      resolve('Third promise was resolved');

      document.removeEventListener('mousedown', thirdEvent);
    }
  };

  document.addEventListener('mousedown', thirdEvent);
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
