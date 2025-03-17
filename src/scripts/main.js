'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    reject(new Error('First promise was rejected in 3 seconds'));
  }, 3000);

  document.addEventListener(
    'click',
    () => {
      clearTimeout(timeout);
      resolve('First promise was resolved');
    },
    { once: true },
  );
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener(
    'mousedown',
    () => {
      resolve('Second promise was resolved');
    },
    { once: true },
  );
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  function handleClick(e) {
    if (e.button === 0) {
      leftClick = true;
    } else if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      document.removeEventListener('mousedown', handleClick);
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('mousedown', handleClick);
  document.addEventListener('contextmenu', (e) => e.preventDefault());
});

const successHandler = (result) => {
  document.body.appendChild(createNotification('success', result));
};

const errorHandler = (error) => {
  document.body.appendChild(createNotification('error', error.message));
};

function createNotification(clazz, message) {
  const div = document.createElement('div');

  div.className = clazz;
  div.dataset.dataQa = 'notification';
  div.textContent = message;

  return div;
}

firstPromise.then(successHandler, errorHandler);
secondPromise.then(successHandler, errorHandler);
thirdPromise.then(successHandler, errorHandler);
