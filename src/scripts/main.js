'use strict';

function createNotification(message, type) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.className = type;
  notification.innerText = message;
  document.body.append(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', e => {
    const presedButton = e.button;

    if (presedButton === 0 || presedButton === 1 || presedButton === 2) {
      resolve();
    }
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', e => {
    const presedButton = e.button;

    if (presedButton === 0 || presedButton === 2) {
      resolve();
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let pressedFirst = false;
  let pressedSecond = false;

  document.addEventListener('mousedown', e => {
    const presedButton = e.button;

    if (presedButton === 0) {
      pressedFirst = true;
    }

    if (presedButton === 2) {
      pressedSecond = true;
    }

    if (pressedFirst && pressedSecond) {
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    createNotification('First promise was resolved!', 'success');
  })
  .catch(() => {
    createNotification('First promise was rejected!', 'warning');
  });

secondPromise.then(() => {
  createNotification('Second promise was resolved!', 'success');
});

thirdPromise.then(() => {
  createNotification('Third promise was resolved!', 'success');
});
