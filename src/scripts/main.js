'use strict';

function createNotification(message, isSuccess) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add(isSuccess ? 'success' : 'warning');
  notification.textContent = message;
  document.body.appendChild(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((result) => {
    createNotification(result, true);
  })
  .catch((error) => {
    createNotification(error, false);
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise.then((result) => {
  createNotification(result, true);
});

const thirdPromise = new Promise((resolve) => {
  const buttonsPressed = {
    left: false,
    right: false,
  };

  const checkButtons = () => {
    if (buttonsPressed.left && buttonsPressed.right) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      buttonsPressed.left = true;
      checkButtons();
    } else if (e.button === 2) {
      buttonsPressed.right = true;
      checkButtons();
    }
  });
});

thirdPromise.then((result) => {
  createNotification(result, true);
});
