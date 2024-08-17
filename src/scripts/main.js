'use strict';

function showNotification(type, message) {
  const notificationDiv = document.createElement('div');

  notificationDiv.setAttribute('data-qa', 'notification');
  notificationDiv.className = type;
  notificationDiv.textContent = message;
  document.body.appendChild(notificationDiv);
}

const firstPromise = new Promise((resolve, reject) => {
  const handleLeftClick = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      document.removeEventListener('click', handleLeftClick);
      clearTimeout(rejectionTimeout);
    }
  };

  const rejectionTimeout = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', handleLeftClick);
});

const secondPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleClick);
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const handleClick = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    } else if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleClick);
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

firstPromise
  .then((message) => showNotification('success', message))
  .catch((message) => showNotification('error', message));

secondPromise.then((message) => showNotification('success', message));

thirdPromise.then((message) => showNotification('success', message));
