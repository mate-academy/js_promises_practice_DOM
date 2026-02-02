'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let timeoutId = setTimeout(() => {
    if (isSettled) {
      return;
    }

    isSettled = true;

    reject(new Error('First promise was rejected'));
    cleanup();
  }, 3000);

  let isSettled = false;

  function handleClick() {
    if (isSettled) {
      return;
    }

    isSettled = true;

    resolve('First promise was resolved');
    cleanup();
  }

  function cleanup() {
    document.removeEventListener('click', handleClick);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }

  document.addEventListener('click', handleClick);

  timeoutId = setTimeout(() => {
    if (isSettled) {
      return;
    }

    isSettled = true;

    reject(new Error('First promise was rejected'));
    cleanup();
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;
  let isResolved = false;

  function handleLeftClick() {
    leftClicked = true;
    checkAndResolve();
  }

  function handleRightClick(ev) {
    ev.preventDefault();
    rightClicked = true;
    checkAndResolve();
  }

  function checkAndResolve() {
    if ((leftClicked || rightClicked) && !isResolved) {
      isResolved = true;
      resolve('Second promise was resolved');
      cleanup();
    }
  }

  function cleanup() {
    document.removeEventListener('click', handleLeftClick);
    document.removeEventListener('contextmenu', handleRightClick);
  }

  document.addEventListener('click', handleLeftClick);
  document.addEventListener('contextmenu', handleRightClick);
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;
  let isResolved = false;

  function handleLeftClick() {
    leftClicked = true;
    checkAndResolve();
  }

  function handleRightClick(ev) {
    ev.preventDefault();
    rightClicked = true;
    checkAndResolve();
  }

  function checkAndResolve() {
    if (leftClicked && rightClicked && !isResolved) {
      isResolved = true;
      resolve('Third promise was resolved');
      cleanup();
    }
  }

  function cleanup() {
    document.removeEventListener('click', handleLeftClick);
    document.removeEventListener('contextmenu', handleRightClick);
  }

  document.addEventListener('click', handleLeftClick);
  document.addEventListener('contextmenu', handleRightClick);
});

// Обробники залишаються без змін
firstPromise
  .then((message) => {
    notifications('success', message);
  })
  .catch((error) => {
    notifications('error', error.message);
  });

secondPromise.then((message) => {
  notifications('success', message);
});

thirdPromise.then((message) => {
  notifications('success', message);
});

function notifications(type, text) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.classList.add(type);
  notification.textContent = text;
  document.body.appendChild(notification);
}
