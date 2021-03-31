'use strict';

const body = document.querySelector('body');

const createNotification = (notificationType, message) => {
  body.insertAdjacentHTML('beforeend', `
    <div
      data-qa='notification'
      class ='${notificationType}'
    >
      ${message}
    </div>
  `);
};

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First Promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First Promise was rejected'));
  }, 3000);
});

const seconPromise = new Promise((resolve) => {
  body.addEventListener('mousedown', (handleMouse) => {
    if (handleMouse.button === 0 || handleMouse.button === 2) {
      resolve('Second Promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let hasPressLefButton = false;
  let hasPressRightButton = false;

  body.addEventListener('mousedown', (handleMouse) => {
    if (handleMouse.button === 0) {
      hasPressLefButton = true;
    }

    if (handleMouse.button === 2) {
      hasPressRightButton = true;
    }

    if (hasPressLefButton && hasPressRightButton) {
      resolve('Third Promise was resolved');
    }
  });
});

firstPromise
  .then((message) => {
    createNotification('success', message);
  })
  .catch((errorMessage) => {
    createNotification('error', errorMessage);
  });

seconPromise
  .then((message) => {
    createNotification('success', message);
  });

thirdPromise
  .then((message) => {
    createNotification('success', message);
  });
