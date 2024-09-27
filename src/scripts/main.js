'use strict';

const body = document.querySelector('body');
const createNotificationElement = () => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  document.body.appendChild(notification);

  return notification;
};

const showNotification = (message, type) => {
  const notification = createNotificationElement();

  notification.textContent = message;
  notification.classList.add(type);
};

const firstPromise = new Promise((resolve, reject) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      body.removeEventListener('click', handleClick);
    }
  };

  body.addEventListener('click', handleClick);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
    body.removeEventListener('click', handleClick);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const handleClick = () => {
    resolve('Second promise was resolved');
    body.removeEventListener('click', handleClick);
  };

  body.addEventListener('click', handleClick);

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
    body.removeEventListener('click', handleClick);
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const checkClicks = () => {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      body.removeEventListener('click', handleClick);
    }
  };

  const handleClick = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    } else if (e.button === 2) {
      e.preventDefault();
      rightClicked = true;
    }

    checkClicks();
  };

  body.addEventListener('click', handleClick);
  body.addEventListener('contextmenu', handleClick);
});

firstPromise.then(
  (result) => showNotification(result, 'success'),
  (error) => showNotification(error.message, 'error'),
);
secondPromise.then((result) => showNotification(result, 'success'));
thirdPromise.then((result) => showNotification(result, 'success'));
