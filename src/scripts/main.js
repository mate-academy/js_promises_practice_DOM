'use strict';

function createNotification(noti, isSuccess) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add(isSuccess ? 'success' : 'warning');
  notification.textContent = noti;
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
  document.addEventListener('mousedown', (mouse) => {
    if (mouse.button === 0 || mouse.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise.then((result) => {
  createNotification(result, true);
});

const thirdPromise = new Promise((resolve) => {
  let leftButtonPressed = false;
  let rightButtonPressed = false;

  document.addEventListener('mousedown', (mouse) => {
    switch (mouse.button) {
      case 0:
        leftButtonPressed = true;
        break;

      case 2:
        rightButtonPressed = true;
        break;

      default:
        break;
    }

    if (leftButtonPressed && rightButtonPressed) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((result) => {
  createNotification(result, true);
});

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});
