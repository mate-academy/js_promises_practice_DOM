'use strict';

function setNotification(type, message) {
  const notification = document.createElement('div');

  notification.className = type === 'error' ? 'error' : 'success';
  notification.setAttribute('data-qa', 'notification');
  notification.textContent = message;

  document.body.appendChild(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  let resolved = false;

  function getValue(e) {
    if (e.button === 0) {
      resolved = true;
      resolve('First promise was resolved');
      document.removeEventListener('click', getValue);
    }
  }

  document.addEventListener('click', getValue);

  setTimeout(() => {
    if (!resolved) {
      reject(new Error('First promise was rejected'));
      document.removeEventListener('click', getValue);
    }
  }, 3000);
});

firstPromise
  .then((msg) => setNotification('success', msg))
  .catch((err) => setNotification('error', err.message));

const secondPromise = new Promise((resolve) => {
  function getPromiseValue(e) {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', getPromiseValue);
    }
  }

  document.addEventListener('mousedown', getPromiseValue);
});

secondPromise.then((msg) => setNotification('success', msg));

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;



  document.addEventListener('mousedown', getValue);
});

thirdPromise.then((msg) => setNotification('success', msg));

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});
