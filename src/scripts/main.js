'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let resolved = false;

  const timeout = setTimeout(() => {
    if (!resolved) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);

  document.addEventListener('click', (e) => {
    if (e.button === 0 && !resolved) {
      clearTimeout(timeout);
      resolved = true;
      resolve('First promise was resolved');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  const onClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      e.preventDefault();
      resolve('Second promise was resolved');
      document.removeEventListener('click', onClick);
      document.removeEventListener('contextmenu', onClick);
    }
  };

  document.addEventListener('click', onClick);
  document.addEventListener('contextmenu', onClick);
});

let leftClick = false;
let rightClick = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClick = true;

      if (rightClick) {
        resolve('Third promise was resolved');
      }
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;

    if (leftClick) {
      resolve('Third promise was resolved');
    }
  });
});

function createNotification(message, isError = false) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(isError ? 'error' : 'success');
  div.textContent = message;
  document.body.appendChild(div);
}

firstPromise
  .then((message) => createNotification(message))
  .catch((error) => createNotification(error, true));
secondPromise.then((message) => createNotification(message));
thirdPromise.then((message) => createNotification(message));

document.addEventListener('contextmenu', (e) => e.preventDefault());
