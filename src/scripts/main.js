'use strict';

const body = document.querySelector('body');

function createNotification(type, textMessage) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = type;
  notification.textContent = textMessage;
  body.append(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });
  setTimeout(() => reject(new Error()), 3000);
});

firstPromise
  .then(() => {
    createNotification('succes', 'First promise was resolved');
  })
  .catch(() => {
    createNotification('error', 'First promise was rejected');
  });

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve();
  });
});

secondPromise
  .then(() => {
    createNotification('succes', 'Second promise was resolved');
  })
  .catch(() => {
    createNotification('error', 'Seconsd promise was rejected');
  });

const thirdPromise = new Promise((resolve, reject) => {
  let mouseLeft = false;
  let mouseRight = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      mouseLeft = true;
    }

    if (e.button === 2) {
      mouseRight = true;
    }

    if (mouseLeft && mouseRight) {
      resolve();
    }
  });
});

thirdPromise
  .then(() => {
    createNotification('succes', 'Third promise was resolved');
  })
  .catch(() => {
    createNotification('error', 'Third promise was rejected');
  });
