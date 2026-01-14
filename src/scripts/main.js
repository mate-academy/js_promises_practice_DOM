'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let leftClick = false;

  const handler = () => {
    leftClick = true;
    resolve('First promise was resolved');
    clearTimeout(timeout);
  };

  document.addEventListener('click', handler, { once: true });

  const timeout = setTimeout(() => {
    if (!leftClick) {
      document.removeEventListener('click', handler);
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const cleanup = () => {
    document.removeEventListener('click', leftClickHandler);
    document.removeEventListener('contextmenu', rightClickHandler);
  };
  const leftClickHandler = () => {
    cleanup();
    resolve('Second promise was resolved');
  };
  const rightClickHandler = (e) => {
    cleanup();
    e.preventDefault();
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', leftClickHandler, { once: true });

  document.addEventListener('contextmenu', rightClickHandler, { once: true });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener(
    'click',
    () => {
      leftClick = true;

      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
      }
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      rightClick = true;

      if (leftClick && rightClick) {
        resolve('Third promise was resolved');
      }
    },
    { once: true },
  );
});

function showNotification(message, isSuccess) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = isSuccess ? 'success' : 'error';
  div.textContent = message;
  document.body.append(div);
}

firstPromise
  .then((message) => showNotification(message, true))
  .catch((error) => showNotification(error.message, false));

secondPromise.then((message) => showNotification(message, true));
thirdPromise.then((message) => showNotification(message, true));
