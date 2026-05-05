'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      clearTimeout(timeoutId);
      resolve('First promise was resolved');
      document.removeEventListener('click', handleClick);
    }
  };

  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('click', handleClick);
  }, 3000);

  document.addEventListener('click', handleClick);
});

const secondPromise = new Promise((resolve, reject) => {
  const handleClick = (e) => {
    resolve('Second promise was resolved');
    document.removeEventListener('click', handleClick);
    document.removeEventListener('contextmenu', handleClick);
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const check = () => {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', handleLeft);
      document.removeEventListener('contextmenu', handleRight);
    }
  };

  const handleLeft = () => {
    leftClicked = true;
    check();
  };
  const handleRight = () => {
    rightClicked = true;
    check();
  };

  document.addEventListener('click', handleLeft);
  document.addEventListener('contextmenu', handleRight);
});

function showNotification(message, type) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 5000);
}

firstPromise
  .then((message) => showNotification(message, 'success'))
  .catch(() => showNotification('First promise was rejected', 'error'));

secondPromise
  .then((message) => showNotification(message, 'success'))
  .catch(() => showNotification('Second promise was rejected', 'error'));

thirdPromise
  .then((message) => showNotification(message, 'success'))
  .catch(() => showNotification('Third promise was rejected', 'error'));
