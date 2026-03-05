'use strict';

function firstPromise() {
  return new Promise((resolve, reject) => {
    const timerId = setTimeout(() => {
      document.removeEventListener('click', handleClick);
      reject(new Error('First promise was rejected'));
    }, 3000);

    function handleClick(e) {
      if (e.button === 0) {
        clearTimeout(timerId);
        document.removeEventListener('click', handleClick);
        resolve('First promise was resolved');
      }
    }

    document.addEventListener('click', handleClick);
  });
}

function secondPromise() {
  return new Promise((resolve) => {
    function handleClick(e) {
      if (e.button === 0 || e.button === 2) {
        document.removeEventListener('click', handleClick);
        resolve('Second promise was resolved');
      }
    }

    document.addEventListener('click', handleClick);
  });
}

function thirdPromise() {
  return new Promise((resolve) => {
    let isLeftClicked = false;
    let isRightClicked = false;

    function handleMouseDown(e) {
      if (e.button === 0) {
        isLeftClicked = true;
      }

      if (e.button === 2) {
        isRightClicked = true;
      }

      if (isLeftClicked && isRightClicked) {
        document.removeEventListener('mousedown', handleMouseDown);
        resolve('Third promise was resolved');
      }
    }

    document.addEventListener('mousedown', handleMouseDown);
  });
}

function showNotification(message, className) {
  const notification = document.querySelector('[data-qa="notification"]');

  notification.textContent = message;
  notification.className = '';
  notification.classList.add(className);
}

firstPromise()
  .then((msg) => showNotification(msg, 'success'))
  .catch((err) => showNotification(err.message, 'error'));

secondPromise().then((msg) => showNotification(msg, 'success'));
thirdPromise().then((msg) => showNotification(msg, 'success'));
