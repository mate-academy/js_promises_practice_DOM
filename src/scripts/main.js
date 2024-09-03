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
  const handleClick = (e) => {
    if (e.type === 'click' || e.type === 'contextmenu') {
      e.preventDefault();
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

const thirdPromise = new Promise((resolve) => {
  let rightClicked = false;
  let leftClicked = false;

  document.addEventListener('click', () => {
    leftClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

const addNotification = (message, type) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add(type);
  notification.textContent = message;
  document.body.appendChild(notification);
};

firstPromise
  .then((message) => addNotification(message, 'success'))
  .catch((message) => addNotification(message, 'error'));

secondPromise.then((message) => addNotification(message, 'success'));

thirdPromise.then((message) => addNotification(message, 'success'));
