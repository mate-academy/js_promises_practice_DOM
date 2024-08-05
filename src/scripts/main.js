'use strict';

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

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

// Third Promise
const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;
  const clickHandler = (e) => {
    if (e.button === 0) {
      leftClick = true;
    } else if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', clickHandler);
      document.removeEventListener('contextmenu', clickHandler);
    }
  };

  document.addEventListener('click', clickHandler);
  document.addEventListener('contextmenu', clickHandler);
});

function showNotification(type, message) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = type === 'success' ? 'success' : 'error';
  notification.textContent = message;
  document.body.appendChild(notification);
}

firstPromise.then(
  (message) => showNotification('success', message),
  (error) => showNotification('error', error.message),
);

secondPromise.then((message) => showNotification('success', message));

thirdPromise.then((message) => showNotification('success', message));
