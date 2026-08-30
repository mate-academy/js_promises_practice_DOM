'use strict';

function handleSuccess(message) {
  const notificationDiv = document.createElement('div');

  notificationDiv.setAttribute('data-qa', 'notification');
  notificationDiv.className = 'success';
  notificationDiv.textContent = message;
  document.body.appendChild(notificationDiv);
}

function handleError(error) {
  const notificationDiv = document.createElement('div');

  notificationDiv.setAttribute('data-qa', 'notification');
  notificationDiv.className = 'error';
  notificationDiv.textContent = error?.message || error;
  document.body.appendChild(notificationDiv);
}

const firstPromise = new Promise((resolve, reject) => {
  const handleClick = () => {
    clearTimeout(timerId);
    document.removeEventListener('click', handleClick);
    resolve('First promise was resolved');
  };

  const timerId = setTimeout(() => {
    document.removeEventListener('click', handleClick);
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', handleClick);
});

const secondPromise = new Promise((resolve) => {
  const handleLeftClick = () => {
    cleanup();
    resolve('Second promise was resolved');
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    cleanup();
    resolve('Second promise was resolved');
  };

  function cleanup() {
    document.removeEventListener('click', handleLeftClick);
    document.removeEventListener('contextmenu', handleRightClick);
  }

  document.addEventListener('click', handleLeftClick);
  document.addEventListener('contextmenu', handleRightClick);
});

const thirdPromise = new Promise((resolve) => {
  let hasLeftClick = false;
  let hasRightClick = false;

  const checkBothClicked = () => {
    if (hasLeftClick && hasRightClick) {
      document.removeEventListener('click', onLeftClick);
      document.removeEventListener('contextmenu', onRightClick);

      resolve('Third promise was resolved');
    }
  };

  const onLeftClick = () => {
    hasLeftClick = true;
    checkBothClicked();
  };

  const onRightClick = (e) => {
    e.preventDefault();
    hasRightClick = true;
    checkBothClicked();
  };

  document.addEventListener('click', onLeftClick);
  document.addEventListener('contextmenu', onRightClick);
});

firstPromise.then(handleSuccess).catch(handleError);
secondPromise.then(handleSuccess).catch(handleError);
thirdPromise.then(handleSuccess).catch(handleError);
