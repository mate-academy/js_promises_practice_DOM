'use strict';

let firstListener, secondListener, thirdListener, forthListener, fifthListener;
const body = document.querySelector('body');

function createNotification(message, notificationStatus) {
  if (notificationStatus !== 'success' && notificationStatus !== 'error') {
    return;
  }

  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.setAttribute('class', notificationStatus);
  div.textContent = message;

  body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  const timeout = setTimeout(
    () => reject(Error('First promise was rejected')),
    3000,
  );

  firstListener = document.addEventListener(
    'click',
    () => {
      resolve('First promise was resolved');
      clearTimeout(timeout);
    },
    { once: true },
  );
});

firstPromise.then((value) => createNotification(value, 'success'));

firstPromise.catch((error) => {
  createNotification(error.message, 'error');
  removeEventListener('click', firstListener);
});

const secondPromise = new Promise((resolve) => {
  secondListener = document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  thirdListener = document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

secondPromise.then((value) => {
  createNotification(value, 'success');
  removeEventListener('click', secondListener);
  removeEventListener('contextmenu', thirdListener);
});

const waitForLeftClick = new Promise((resolve) => {
  forthListener = document.addEventListener('click', () => {
    resolve();
  });

});

const waitForRightClick = new Promise((resolve) => {
  fifthListener = document.addEventListener('contextmenu', () => {
    resolve();
  });

});

const thirdPromise = new Promise((resolve) => {
  Promise.all([waitForLeftClick, waitForRightClick]).then((results) => {
    resolve('Third promise was resolved');
    removeEventListener('click', forthListener);
    removeEventListener('contextmenu', fifthListener);
  });
});

thirdPromise.then((value) => {
  createNotification(value, 'success');
});
