'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (ev) => {
    const leftClick = ev.button === 0;
    const rightClick = ev.button === 2;

    if (leftClick || rightClick) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (ev) => {
    switch (ev.button) {
      case 0:
        leftClick = true;
        break;
      case 2:
        rightClick = true;
        break;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

function success(promiseMessage) {
  const messageContainer = document.querySelector('.messageContainer');

  messageContainer.insertAdjacentHTML('beforeend', `
   <div class="notification notification_success"
        data-qa="notification">${promiseMessage}</div>
  `);
}

function error(promiseMessage) {
  const messageContainer = document.querySelector('.messageContainer');

  messageContainer.insertAdjacentHTML('beforeend', `
  <div class="notification notification_warning"
        data-qa="notification">${promiseMessage.message}</div>
  `);
}

firstPromise.then(success).catch(error);
secondPromise.then(success);
thirdPromise.then(success);
