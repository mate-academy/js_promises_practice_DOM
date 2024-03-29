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
  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);

  function handleClick() {
    resolve('Second promise was resolved');
    document.removeEventListener('click', handleClick);
    document.removeEventListener('contextmenu', handleClick);
  };
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  function handleLeftClick() {
    leftClicked = true;
    checkBothClicked();
  }

  function handleRightClick() {
    rightClicked = true;
    checkBothClicked();
  }

  function checkBothClicked() {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', handleLeftClick);
      document.removeEventListener('contextmenu', handleRightClick);
    }
  }

  document.addEventListener('click', handleLeftClick);
  document.addEventListener('contextmenu', handleRightClick);
});

function createNotification(message, className) {
  const notificationDiv = document.createElement('div');

  notificationDiv.setAttribute('data-qa', 'notification');
  notificationDiv.className = className;
  notificationDiv.textContent = message;
  document.body.appendChild(notificationDiv);
}

firstPromise
  .then((message) => {
    createNotification(message, 'success');
  })
  .catch((error) => {
    createNotification(error.message, 'error');
  });

secondPromise
  .then((message) => {
    createNotification(message, 'success');
  });

thirdPromise
  .then((message) => {
    createNotification(message, 'success');
  });
