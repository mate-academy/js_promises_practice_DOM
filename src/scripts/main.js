'use strict';

function showNotification(message, isSuccess) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.className = isSuccess ? 'success' : 'error';
  notification.textContent = message;
  document.body.append(notification);
}

let leftClicked = false;
let rightClicked = false;

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    reject(new Error('First promise was rejected!'));
  }, 3000);

  document.addEventListener(
    'click',
    () => {
      clearTimeout(timerId);
      resolve('First promise was resolved!');
    },
    { once: true },
  );
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener(
    'click',
    () => {
      resolve('Second promise was resolved');
    },
  );

  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      resolve('Second promise was resolved');
    },
  );
});

const thirdPromise = new Promise((resolve) => {
  function checkBothClicked() {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', () => {
    leftClicked = true;
    checkBothClicked();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClicked = true;
    checkBothClicked();
  });
});

firstPromise
  .then((message) => {
    showNotification(message, true);
  })
  .catch((error) => {
    showNotification(error.message, false);
  });

secondPromise.then((message) => {
  showNotification(message, true);
});

thirdPromise.then((message) => {
  showNotification(message, true);
});
