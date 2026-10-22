'use strict';

function showNotification(type, message) {
  const notification = document.createElement('div');

  notification.textContent = message;
  notification.classList.add(type);
  notification.setAttribute('data-qa', 'notification');

  document.body.append(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const leftClickPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const rightClickPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
});

const thirdPromise = Promise.all([leftClickPromise, rightClickPromise]);
const thirdPromiseMessage = 'Third promise was resolved';

firstPromise
  .then((success) => showNotification('success', success))
  .catch((error) => showNotification('error', error.message));

secondPromise
  .then((success) => showNotification('success', success))
  .catch((error) => showNotification('error', error.message));

thirdPromise
  .then(() => showNotification('success', thirdPromiseMessage))
  .catch((error) => showNotification('error', error.message));
