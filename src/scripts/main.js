'use strict';

const body = document.querySelector('body');

function createNotification(message, type) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.textContent = message;
  notification.className = type;
  body.append(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => reject(new Error()), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });

  document.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', (e1) => {
    document.addEventListener('click', (e2) => {
      resolve('Third promise was resolved');
    });
  });

  document.addEventListener('click', (e2) => {
    document.addEventListener('contextmenu', (e1) => {
      resolve('Third promise was resolved');
    });
  });
});

firstPromise
  .then(() => {
    createNotification('First promise was resolved', 'success');
  })
  .catch(() => {
    createNotification('First promise was rejected', 'error');
  });

secondPromise.then(() => {
  createNotification('Second promise was resolved', 'success');
});

thirdPromise.then(() => {
  createNotification('Third promise was resolved', 'success');
});
