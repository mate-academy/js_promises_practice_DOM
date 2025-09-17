'use strict';

const notification = document.createElement('div');

document.body.appendChild(notification);

function showNotification(message, type = 'success') {
  const divChild = document.createElement('div');

  divChild.setAttribute('data-qa', 'notification');
  divChild.className = type;
  divChild.textContent = message;
  notification.appendChild(divChild);
}

document.addEventListener('contextmenu', (e) => e.preventDefault());

// FIRST PROMISE
const firstPromise = new Promise((resolve, reject) => {
  let isClicked = false;
  const onClick = (evt) => {
    if (evt.button === 0) {
      isClicked = true;
      resolve('First promise was resolved');
      clearTimeout(timeoutId);
      document.removeEventListener('click', onClick);
    }
  };

  document.addEventListener('click', onClick);

  const timeoutId = setTimeout(() => {
    if (!isClicked) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected');
      document.removeEventListener('click', onClick);
    }
  }, 3000);
});

firstPromise.then(
  (msg) => showNotification(msg, 'success'),
  (err) => showNotification(err, 'error'),
);

// SECOND PROMISE

const secondPromise = new Promise((resolve) => {
  const onClick = (evt) => {
    if (evt.button === 0) {
      resolve('Second promise was resolved');
      document.removeEventListener('click', onClick);
    }
  };

  const onClick1 = (evt) => {
    if (evt.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('contextmenu', onClick1);
    }
  };

  document.addEventListener('click', onClick);
  document.addEventListener('contextmenu', onClick1);
});

secondPromise.then(
  (msg) => showNotification(msg, 'success'),
  (err) => showNotification(err, 'error'),
);

// THIRD PROMISE

const thirdPromise = new Promise((resolve) => {
  let firstMbuttonClicked = false;
  let secondMbuttonClicked = false;

  function result() {
    if (firstMbuttonClicked && secondMbuttonClicked) {
      resolve('Third promise was resolved');

      document.removeEventListener('mousedown', onClick);
    }
  }

  const onClick = (evt) => {
    if (evt.button === 0) {
      firstMbuttonClicked = true;
    }

    document.removeEventListener('click', onClick);
    result();
  };

  const onClick1 = (evt) => {
    if (evt.button === 2) {
      secondMbuttonClicked = true;
    }

    document.removeEventListener('contextmenu', onClick1);
    result();
  };

  document.addEventListener('contextmenu', onClick1);
  document.addEventListener('click', onClick);
});

thirdPromise.then(
  (msg) => showNotification(msg, 'success'),
  (err) => showNotification(err, 'error'),
);
