'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const clickListener = () => {
    resolve('First promise was resolved');

    document.removeEventListener('click', clickListener);
  };

  document.addEventListener('click', clickListener);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const leftClickListener = (e) => {
    if (e.button === 0) {
      leftClick = true;
      checkBothClicks();
    }
  };

  const rightClickListener = (e) => {
    e.preventDefault();

    if (e.button === 2) {
      rightClick = true;
      checkBothClicks();
    }
  };

  const checkBothClicks = () => {
    if (leftClick || rightClick) {
      resolve('Second promise was resolved');

      document.removeEventListener('click', leftClickListener);
      document.removeEventListener('contextmenu', rightClickListener);
    }
  };

  document.addEventListener('click', leftClickListener);
  document.addEventListener('contextmenu', rightClickListener);
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const leftClickListener = (e) => {
    if (e.button === 0) {
      leftClick = true;
      checkBothClicks();
    }
  };

  const rightClickListener = (e) => {
    e.preventDefault();

    if (e.button === 2) {
      rightClick = true;
      checkBothClicks();
    }
  };

  const checkBothClicks = () => {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');

      document.removeEventListener('click', leftClickListener);
      document.removeEventListener('contextmenu', rightClickListener);
    }
  };

  document.addEventListener('click', leftClickListener);
  document.addEventListener('contextmenu', rightClickListener);
});

function successHandler(message) {
  const notification = document.createElement('div');

  notification.className = 'message success';
  notification.setAttribute('data-qa', 'notification');
  notification.textContent = message;

  document.body.appendChild(notification);
}

function errorHandler(error) {
  const notification = document.createElement('div');

  notification.className = 'message error';
  notification.setAttribute('data-qa', 'notification');
  notification.textContent = error.message;

  document.body.appendChild(notification);
}

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler).catch(errorHandler);
thirdPromise.then(successHandler).catch(errorHandler);
