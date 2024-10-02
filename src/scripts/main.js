'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected').message);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mouseup', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let right = false;
  let left = false;

  document.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      left = true;
    } else if (e.button === 2) {
      right = true;
    }

    if (left && right) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((value) => {
    createNotification(value, 'success');
  })
  .catch((error) => {
    createNotification(error, 'error');
  });

secondPromise.then((value) => {
  createNotification(value, 'success');
});

thirdPromise.then((value) => {
  createNotification(value, 'success');
});

function createNotification(description, type) {
  const notification = document.createElement('div');

  notification.className = type;
  notification.dataset.qa = 'notification';
  notification.innerHTML = `<p>${description}</p>`;

  document.body.appendChild(notification);
}
