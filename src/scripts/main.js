'use strict';

const showNotification = (message, isError = false) => {
  const div = document.createElement('div');

  div.textContent = message;
  div.className = isError ? 'error' : 'success';
  div.setAttribute('data-qa', 'notification');
  document.body.appendChild(div);
};

const firstPromise = new Promise((resolve, reject) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('click', handleClick);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('click', handleClick);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }
  });

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((message) => showNotification(message))
  .catch((error) => showNotification(error.message, true));
secondPromise.then((message) => showNotification(message));
thirdPromise.then((message) => showNotification(message));
