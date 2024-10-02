'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected').message);
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0 || e.button === 1) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0 && e.button === 1) {
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
