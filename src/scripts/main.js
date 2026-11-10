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

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  function checkClicks() {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', () => {
    leftClicked = true;
    checkClicks();
  });

  document.addEventListener('contextmenu', () => {
    rightClicked = true;
    checkClicks();
  });
});

function successHandler(message) {
  const notification = document.createElement('div');

  notification.classList.add('success');
  notification.setAttribute('data-qa', 'notification');
  notification.textContent = message;

  document.body.append(notification);
}

function errorHandler(error) {
  const notification = document.createElement('div');

  notification.classList.add('error');
  notification.setAttribute('data-qa', 'notification');
  notification.textContent = error.message;

  document.body.append(notification);
}

firstPromise.then(successHandler, errorHandler);
secondPromise.then(successHandler, errorHandler);
thirdPromise.then(successHandler, errorHandler);
