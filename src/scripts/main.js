'use strict';

const firstPromise = () =>
  new Promise((resolve, reject) => {
    const handleLeftClick = () => {
      clearTimeout(timeoutId);
      resolve('First promise was resolved');
      window.removeEventListener('click', handleLeftClick);
    };

    const timeoutId = setTimeout(() => {
      reject(new Error('First promise was rejected'));
      window.removeEventListener('click', handleLeftClick);
    }, 3000);

    window.addEventListener('click', handleLeftClick);
  });

firstPromise()
  .then(createSuccessMessage)
  .catch((err) => createErrorMessage(err.message));

const secondPromise = () =>
  new Promise((resolve) => {
    const handleAnyClick = (e) => {
      e.preventDefault();
      resolve('Second promise was resolved');
    };

    document.addEventListener('click', handleAnyClick, { once: true });
    document.addEventListener('contextmenu', handleAnyClick, { once: true });
  });

secondPromise().then(createSuccessMessage);

const thirdPromise = () =>
  new Promise((resolve) => {
    let leftClick = false;
    let rightClick = false;

    const handleLeftClick = (e) => {
      e.preventDefault();
      leftClick = true;
      checkBothClick();
    };

    const handleRightClick = (e) => {
      e.preventDefault();
      rightClick = true;
      checkBothClick();
    };

    function checkBothClick() {
      if (rightClick && leftClick) {
        resolve(`Third promises was resolved`);
        cleanupListeners();
      }
    }

    function cleanupListeners() {
      window.removeEventListener('click', handleLeftClick);
      window.removeEventListener('contextmenu', handleRightClick);
    }

    window.addEventListener('click', handleLeftClick, { once: true });
    window.addEventListener('contextmenu', handleRightClick, { once: true });
  });

thirdPromise().then(createSuccessMessage);

function createSuccessMessage(text) {
  createNotification(text, 'success');
}

function createErrorMessage(text) {
  createNotification(text, 'error');
}

function createNotification(text, type) {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');
  message.className = type;
  message.innerText = text;
  document.body.append(message);
}
