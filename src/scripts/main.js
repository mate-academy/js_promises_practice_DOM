'use strict';

let isSettled = false;
let leftFlag = false;
let rightFlag = false;
const notificationDiv = document.querySelector('[data-qa="notification"]');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      isSettled = true;
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    if (!isSettled) {
      isSettled = true;
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  let timeoutId = null;

  document.addEventListener('click', (e) => {
    if (e.button === 0 || e.button === 2) {
      clearTimeout(timeoutId);
      resolve('Second promise was resolved');
    }
  });

  timeoutId = setTimeout(() => {
    resolve('Second promise was resolved (timeout)');
  }, 5000);
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftFlag = true;
    }

    if (e.button === 2) {
      rightFlag = true;
    }

    if (leftFlag && rightFlag) {
      resolve('Third promise was resolved');
    }
  });
});

function displayNotification(message, isError) {
  if (notificationDiv) {
    notificationDiv.textContent = message;
    notificationDiv.classList.remove('success', 'error');
    notificationDiv.classList.add(isError ? 'error' : 'success');
  }
}

firstPromise
  .then((result) => {
    displayNotification(result, false);
  })
  .catch((error) => {
    displayNotification(error.message, true);
  });

secondPromise.then((result) => {
  displayNotification(result, false);
});

thirdPromise.then((result) => {
  displayNotification(result, false);
});
