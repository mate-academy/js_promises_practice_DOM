'use strict';

const showNotification = (message, type) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add(type);
  notification.textContent = message;
  document.body.append(notification);
};

const onSuccess = (message) => showNotification(message, 'success');
const onError = (message) => showNotification(message, 'error');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    if (event.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    if (event.button === 0) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const check = () => {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', () => {
    if (event.button === 0) {
      leftClicked = true;
      check();
    }
  });

  document.addEventListener('contextmenu', () => {
    rightClicked = true;
    check();
  });
});

firstPromise.then(onSuccess, (error) => onError(error.message));
secondPromise.then(onSuccess, (error) => onError(error.message));
thirdPromise.then(onSuccess, (error) => onError(error.message));
