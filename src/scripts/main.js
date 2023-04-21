'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', resolve);

  setTimeout(() => {
    reject(Error);
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', resolve);
  document.addEventListener('contextmenu', resolve);
});

const thirdPromise = new Promise((resolve, reject) => {
  const hasClicks = {
    left: false,
    right: false,
  };

  document.addEventListener('click', () => {
    hasClicks.left = true;
  });

  document.addEventListener('contextmenu', () => {
    hasClicks.right = true;

    if (hasClicks.left && hasClicks.right) {
      resolve();
    }
  });
});

const createNotification = (message, type) => {
  const notificationId = '1';
  let notificationElement = document.getElementById(notificationId);

  if (notificationElement) {
    notificationElement.remove();
  }

  notificationElement = document.createElement('div');

  notificationElement.id = notificationId;
  notificationElement.setAttribute('data-qa', 'notification');
  notificationElement.classList.add(type);
  notificationElement.innerText = message;

  document.body.appendChild(notificationElement);
};

firstPromise
  .then(() => {
    createNotification('First promise was resolved', 'success');
  }).catch(() => {
    createNotification('First promise was rejected', 'warning');
  });

secondPromise.then(() => {
  createNotification('Second promise was resolved', 'success');
});

thirdPromise.then(() => {
  createNotification('Third promise was resolved', 'success');
});
