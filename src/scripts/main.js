'use strict';

const notifications = document.createElement('div');

notifications.classList.add('notifications');
document.body.appendChild(notifications);

const generateNotification = (className, message) => {
  notifications.insertAdjacentHTML('beforeend', `
    <div
      class="notification ${className}"
      data-qa="notification">${message}
    </div>
  `);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick || rightClick) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(data => generateNotification('success', data))
  .catch(error => generateNotification('warning', error));

secondPromise
  .then(data => generateNotification('success', data));

thirdPromise
  .then(data => generateNotification('success', data));
