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

const promise1 = new Promise((resolve, reject) => {
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

const promise2 = new Promise((resolve) => {
  document.addEventListener(
    'click',
    () => {
      resolve('Second promise was resolved');
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      resolve('Second promise was resolved');
    },
    { once: true },
  );
});

const promise3 = new Promise((resolve) => {
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

promise1
  .then((message) => {
    showNotification(message, true);
  })
  .catch((error) => {
    showNotification(error.message, false);
  });

promise2.then((message) => {
  showNotification(message, true);
});

promise3.then((message) => {
  showNotification(message, true);
});
