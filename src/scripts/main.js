'use strict';

const notification = document.querySelector('[data-qa="notification"]');

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    clearTimeout(timeoutId);
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', function handleClick(e) {
    if (e.button === 0) {
      document.removeEventListener('click', handleClick);
      clearTimeout(timeoutId);
      resolve('First promise was resolved');
    }
  });
});

firstPromise.then((message) => {
  notification.classList.add('success');
  notification.textContent = message;
}).catch((error) => {
  notification.classList.add('warning');
  notification.textContent = error.message;
});

const secondPromise = new Promise((resolve) => {
  function handleClick(e) {
    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('click', handleClick);
      resolve('Second promise was resolved');
    }
  }
  document.addEventListener('click', handleClick);
});

secondPromise.then((message) => {
  notification.classList.add('success');
  notification.textContent = message;
});

const thirdPromise = new Promise((resolve) => {
  const clicks = {
    left: false, right: false,
  };

  function handleClick(e) {
    if (e.button === 0) {
      clicks.left = true;
    } else if (e.button === 2) {
      clicks.right = true;
    }

    if (clicks.left && clicks.right) {
      document.removeEventListener('click', handleClick);
      resolve('Third promise was resolved');
    }
  }
  document.addEventListener('click', handleClick);
});

thirdPromise.then((message) => {
  notification.classList.add('success');
  notification.textContent = message;
});
