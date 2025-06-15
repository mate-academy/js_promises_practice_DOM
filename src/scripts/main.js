'use strict';

const showNotification = (message, type) => {
  const notification = document.createElement('div');

  notification.textContent = message;
  notification.setAttribute('data-qa', 'notification');
  notification.classList.add(type);
  document.body.appendChild(notification);
};

const onSuccess = (msg) => showNotification(msg, 'success');
const onError = (msg) => showNotification(msg, 'error');

const firstPromise = new Promise((resolve, reject) => {
  document.onclick = () => {
    resolve('First promise was resolved');
  };

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

let leftClicked = false;
let rightClicked = false;
const thirdPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

const promises = [firstPromise, secondPromise, thirdPromise];

for (const p of promises) {
  p.then(onSuccess).catch((e) => onError(e.message));
}
