'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    clearTimeout(timer);
    resolve('First promise was resolved');
  });

  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((message) => {
    const notification = document.createElement('div');

    notification.setAttribute('data-qa', 'notification');
    notification.className = 'success';
    notification.textContent = message;
    document.body.appendChild(notification);
  })
  .catch((error) => {
    const notification = document.createElement('div');

    notification.setAttribute('data-qa', 'notification');
    notification.className = 'error';
    notification.textContent = error.message;
    document.body.appendChild(notification);
  });

const secondPromise = new Promise((resolve) => {
  const handleResolve = () => {
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', handleResolve);
  document.addEventListener('contextmenu', handleResolve);
});

secondPromise
  .then((message) => {
    const notification = document.createElement('div');

    notification.setAttribute('data-qa', 'notification');
    notification.className = 'success';
    notification.textContent = message;
    document.body.appendChild(notification);
  })
  .catch((error) => {
    const notification = document.createElement('div');

    notification.setAttribute('data-qa', 'notification');
    notification.className = 'error';
    notification.textContent = error;
    document.body.appendChild(notification);
  });

const thirdPromise = new Promise((resolve, reject) => {
  let isLeftClicked = false;
  let isRightClicked = false;

  const checkClicks = () => {
    if (isLeftClicked && isRightClicked) {
      resolve('Third promise was resolved');
    }
  };

  const handleLeft = () => {
    isLeftClicked = true;
    checkClicks();
  };

  const handleRight = () => {
    isRightClicked = true;
    checkClicks();
  };

  document.addEventListener('click', handleLeft);
  document.addEventListener('contextmenu', handleRight);
});

thirdPromise
  .then((message) => {
    const notification = document.createElement('div');

    notification.setAttribute('data-qa', 'notification');
    notification.className = 'success';
    notification.textContent = message;
    document.body.appendChild(notification);
  })
  .catch((error) => {
    const notification = document.createElement('div');

    notification.setAttribute('data-qa', 'notification');
    notification.className = 'error';
    notification.textContent = error;
    document.body.appendChild(notification);
  });
