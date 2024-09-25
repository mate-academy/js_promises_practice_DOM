'use strict';

function createNotification(type, message) {
  const notifDiv = document.createElement('div');

  notifDiv.setAttribute('data-qa', 'notification');
  notifDiv.textContent = message;

  if (type === 'success') {
    notifDiv.classList.add('success');
  }

  if (type === 'error') {
    notifDiv.classList.add('error');
  }

  document.body.appendChild(notifDiv);
}

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', (evnt) => {
    if (evnt.button === 0) {
      clearTimeout(timeoutId);
      resolve('First promise was resolved!');
    }
  });
});

firstPromise
  .then((message) => createNotification('success', message))
  .catch((message) => createNotification('error', message));

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (evnt) => {
    if (evnt.button === 0) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (evnt) => {
    evnt.preventDefault();

    if (evnt.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise.then((message) => createNotification('success', message));

const thirdPromise = new Promise((resolve) => {
  let leftButton = false;
  let rightButton = false;

  document.addEventListener('click', (evnt) => {
    if (evnt.button === 0) {
      leftButton = true;
    }

    if (rightButton && leftButton) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (evnt) => {
    evnt.preventDefault();

    if (evnt.button === 2) {
      rightButton = true;
    }

    if (rightButton && leftButton) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((message) => createNotification('success', message));
