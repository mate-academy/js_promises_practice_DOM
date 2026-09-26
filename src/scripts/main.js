'use strict';

function createNotification(type, message) {
  const notification = document.createElement('div');

  notification.className = type;
  notification.setAttribute('data-qa', 'notification');
  notification.textContent = message;

  document.body.append(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    document.removeEventListener('click', handleClick);
    reject(new Error('First promise was rejected'));
  }, 3000);

  function handleClick() {
    clearTimeout(timeoutId);
    document.removeEventListener('click', handleClick);
    resolve('First promise was resolved');
  }

  document.addEventListener('click', handleClick);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  function checkBothClicks() {
    if (leftClicked && rightClicked) {
      document.removeEventListener('click', handleLeftClick);
      document.removeEventListener('contextmenu', handleRightClick);
      resolve('Third promise was resolved');
    }
  }

  function handleLeftClick() {
    leftClicked = true;
    checkBothClicks();
  }

  function handleRightClick() {
    rightClicked = true;
    checkBothClicks();
  }

  document.addEventListener('click', handleLeftClick);
  document.addEventListener('contextmenu', handleRightClick);
});

firstPromise
  .then((messageText) => createNotification('success', messageText))
  .catch((error) => createNotification('error', error.message));

secondPromise
  .then((messageText) => createNotification('success', messageText))
  .catch((error) => createNotification('error', error.message));

thirdPromise
  .then((messageText) => createNotification('success', messageText))
  .catch((error) => createNotification('error', error.message));
