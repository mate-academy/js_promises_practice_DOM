'use strict';

const createNotification = (message, type) => {
  const notificationElement = document.createElement('div');

  notificationElement.setAttribute('data-qa', 'notification');
  notificationElement.classList.add(type);
  notificationElement.innerText = message;

  document.body.appendChild(notificationElement);
};

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(Error);
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const promise3 = new Promise((resolve, reject) => {
  const clicks = {
    left: false,
    right: false,
  };

  document.addEventListener('click', () => {
    clicks.left = true;

    if (clicks.right) {
      resolve();
    }
  });

  document.addEventListener('contextmenu', () => {
    clicks.right = true;

    if (clicks.left) {
      resolve();
    }
  });
});

promise1.then(() => {
  createNotification('First promise was resolved', 'success');
}).catch(() => {
  createNotification('First promise was rejected', 'warning');
});

promise2.then(() => {
  createNotification('Second promise was resolved', 'success');
});

promise3.then(() => {
  createNotification('Third promise was resolved', 'success');
});
