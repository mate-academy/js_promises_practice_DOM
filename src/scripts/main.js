'use strict';

new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
})
  .then(() => {
    pushNotification('success', 'First promise was resolved');
  })
  .catch(() => {
    pushNotification('warning', 'First promise was rejected');
  });

new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if ((e.button === 0) || (e.button === 2)) {
      resolve();
    }
  });
})
  .then(() => {
    pushNotification('success', 'Second promise was resolved');
  });

new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    } else if (e.button === 2) {
      e.preventDefault();
      rightClick = true;
    }

    checkPressedButton();

    function checkPressedButton() {
      if (leftClick && rightClick) {
        resolve();
      }
    }
  });
})
  .then(() => {
    pushNotification('success', 'Third promise was resolved');
  });

function pushNotification(className, message) {
  const msg = document.createElement('div');

  msg.dataset.qa = 'notification';
  msg.className = className;
  msg.textContent = message;
  document.body.append(msg);
}
