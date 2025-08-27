'use strict';

let notification = document.querySelector('[data-qa="notification"]');

if (!notification) {
  notification = document.createElement('div');
  notification.setAttribute('data-qa', 'notification');
  document.body.appendChild(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  function onClick(ev) {
    if (ev.button === 0) {
      clearTimeout(timer);
      resolve('First promise was resolved');
      document.removeEventListener('click', onClick);
    }
  }

  document.addEventListener('click', onClick);
});

const secondPromise = new Promise((resolve) => {
  function onClick(ev) {
    if (ev.button === 0 || ev.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('click', onClick);
    }
  }
  document.addEventListener('click', onClick);
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  function onClick(ev) {
    if (ev.button === 0) {
      leftClick = true;
    }

    if (ev.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', onClick);
    }
  }

  document.addEventListener('click', onClick);
});

firstPromise.then(
  (msg) => {
    notification.textContent = msg;
    notification.className = 'success';
  },
  (err) => {
    notification.textContent = err.message;
    notification.className = 'error';
  },
);

secondPromise.then((msg) => {
  notification.textContent = msg;
  notification.className = 'success';
});

thirdPromise.then((msg) => {
  notification.textContent = msg;
  notification.className = 'success';
});
