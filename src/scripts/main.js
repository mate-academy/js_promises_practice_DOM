'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('click', clickHandler);
  }, 3000);

  const clickHandler = (e) => {
    if (e.button === 0) {
      clearTimeout(timeoutId);
      resolve('First promise was resolved');
      document.removeEventListener('click', clickHandler);
    }
  };

  document.addEventListener('click', clickHandler);
});

firstPromise
  .then((message) => {
    const notification = document.createElement('div');

    notification.setAttribute('data-qa', 'notification');
    notification.classList.add('success');
    notification.textContent = message;
    document.body.appendChild(notification);
  })
  .catch((error) => {
    const notification = document.createElement('div');

    notification.setAttribute('data-qa', 'notification');
    notification.classList.add('error');
    notification.textContent = error;
    document.body.appendChild(notification);
  });

const secondPromise = new Promise((resolve) => {
  const clickHandler = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', clickHandler);
    }
  };

  document.addEventListener('mousedown', clickHandler);
});

secondPromise.then((message) => {
  const existingN = document.querySelectorAll('[data-qa="notification"]');

  existingN.forEach((n) => n.remove());

  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add('success');
  notification.textContent = message;
  document.body.appendChild(notification);
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const clickHandler = (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', clickHandler);
    }
  };

  document.addEventListener('mousedown', clickHandler);
});

thirdPromise.then((message) => {
  const existingN = document.querySelectorAll('[data-qa="notification"]');

  existingN.forEach((n) => n.remove());

  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add('success');
  notification.textContent = message;
  document.body.appendChild(notification);
});
