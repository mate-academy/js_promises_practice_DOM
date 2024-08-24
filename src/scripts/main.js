'use strict';

// const body = document.querySelector('body');
let leftButton = false;
let rightButton = false;

const firstPromise = new Promise((resolve, reject) => {
  const timerReject = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      clearTimeout(timerReject);
    }
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mouseup', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      leftButton = true;
    }

    if (e.button === 2) {
      rightButton = true;
    }

    if (leftButton && rightButton) {
      resolve('Third promise was resolved');
    }
  });
});

function createdNotification(className, message) {
  const notification = document.createElement('div');

  notification.classList.add(className);
  notification.setAttribute('data-qa', 'notification');
  notification.textContent = message;
  document.body.append(notification);
}

firstPromise
  .then((value) => {
    createdNotification('success', value);
  })
  .catch((error) => {
    createdNotification('error', error.message);
  });

secondPromise.then((value) => {
  createdNotification('success', value);
});

thirdPromise.then((value) => {
  createdNotification('success', value);
});
