'use strict';

const leftButton = document.getElementById('buttons__button-left');
const rightButton = document.getElementById('buttons__button-right');
const promiseNotification = document.querySelector('[data-qa="notification"]');
let isLeftClicked = false;
let isRightClicked = false;

function toggleNotificationClass(classToAdd) {
  promiseNotification.classList.add(classToAdd);

  const classToRemove = classToAdd === 'success' ? 'warning' : 'success';

  promiseNotification.classList.remove(classToRemove);
}

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (!isLeftClicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);

  function handleClick() {
    if (isLeftClicked) {
      resolve('first promise was resolved');
    }
  }
  document.addEventListener('click', handleClick);
});

const secondPromise = new Promise((resolve) => {
  function handleClick() {
    if (isLeftClicked || isRightClicked) {
      setTimeout(() => {
        resolve('Second promise was resolved');
      }, 1000);
    }
  }

  document.addEventListener('click', handleClick);
});

const thirdPromise = new Promise((resolve) => {
  function handleClick() {
    if (isLeftClicked && isRightClicked) {
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', handleClick);
});

firstPromise
  .then((resolveMessage) => {
    toggleNotificationClass('success');
    promiseNotification.textContent = resolveMessage;
  })
  .catch((rejectMessage) => {
    toggleNotificationClass('warning');
    promiseNotification.textContent = rejectMessage;
  });

secondPromise
  .then((resolveMessage) => {
    toggleNotificationClass('success');
    promiseNotification.textContent = resolveMessage;
  })
  .catch(() => {});

thirdPromise
  .then((resolveMessage) => {
    toggleNotificationClass('success');
    promiseNotification.textContent = resolveMessage;
  })
  .catch(() => {});

leftButton.addEventListener('click', () => {
  isLeftClicked = true;
});

rightButton.addEventListener('click', () => {
  isRightClicked = true;
});
