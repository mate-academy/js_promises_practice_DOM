'use strict';

const body = document.body;

let leftClick = false;
let rightClick = false;

const promiseHandler = function (message, type) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList.add('notification', type);
  notification.textContent = message;
  body.appendChild(notification);
};

const promise1 = new Promise((resolve, reject) => {
  const clickHandler = (e) => {
    if (e.type === 'click') {
      clearTimeout(clickTimer);
      document.removeEventListener('click', clickHandler);
      resolve('First promise was resolved');
      clearTimeout(clickTimer);
    }
  };

  const clickTimer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('click', clickHandler);
  }, 3000);

  document.addEventListener('click', clickHandler);
});

promise1
  .then((text) => {
    promiseHandler(text, 'success');
  })
  .catch((error) => {
    promiseHandler(error.message, 'error');
  });

const promise2 = new Promise((resolve) => {
  const eventHandler = (e) => {
    if (e.type === 'click' || e.type === 'contextmenu') {
      resolve('Second promise was resolved');
      document.removeEventListener('click', eventHandler);
      document.removeEventListener('contextmenu', eventHandler);
    }
  };

  document.addEventListener('click', eventHandler);
  document.addEventListener('contextmenu', eventHandler);
});

promise2.then((text) => {
  promiseHandler(text, 'success');
});

const promise3 = new Promise((resolve) => {
  const eventHandler = (e) => {
    if (e.type === 'click') {
      leftClick = true;
    }

    if (e.type === 'contextmenu') {
      rightClick = true;
    }

    if (checkingBothClicks(leftClick, rightClick)) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', eventHandler);
      document.removeEventListener('contextmenu', eventHandler);
    }
  };

  document.addEventListener('click', eventHandler);
  document.addEventListener('contextmenu', eventHandler);
});

promise3.then((text) => {
  promiseHandler(text, 'success');
});

function checkingBothClicks(left, right) {
  if (left && right) {
    leftClick = false;
    rightClick = false;

    return true;
  }

  return false;
}
