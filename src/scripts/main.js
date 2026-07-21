'use strict';

const body = document.querySelector('body');

function createNotification(type, text) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.classList.add(type);
  notification.textContent = text;

  body.append(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  function handleLeftClick(e) {
    if (e.button === 0) {
      clearTimeout(timer);

      document.removeEventListener('click', handleLeftClick);

      resolve('First promise was resolved');
    }
  }

  document.addEventListener('click', handleLeftClick);

  const timer = setTimeout(() => {
    document.removeEventListener('click', handleLeftClick);

    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((message) => {
    createNotification('success', message);
  })
  .catch((error) => {
    createNotification('error', error.message);
  });

const secondPromise = new Promise((resolve, reject) => {
  function handleAnyClick(evt) {
    if (evt.button === 0 || evt.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', handleAnyClick);
    }
  }

  document.addEventListener('mousedown', handleAnyClick);
});

secondPromise
  .then((message) => {
    createNotification('success', message);
  })
  .catch((error) => {
    createNotification('error', error.message);
  });

const thirdPromise = new Promise((resolve, reject) => {
  let isLeftClicked = false;
  let isRightClicked = false;

  function handleBothClicks(et) {
    if (et.button === 0) {
      isLeftClicked = true;
    }

    if (et.button === 2) {
      isRightClicked = true;
    }

    if (isLeftClicked && isRightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', handleBothClicks);
    }
  }

  document.addEventListener('mousedown', handleBothClicks);
});

thirdPromise
  .then((message) => {
    createNotification('success', message);
  })
  .catch((error) => {
    createNotification('error', error.message);
  });
