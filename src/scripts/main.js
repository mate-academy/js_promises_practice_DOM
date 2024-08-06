'use strict';

const body = document.querySelector('body');

const showMessage = (message, statusNotification) => {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');

  notification.classList.add(
    statusNotification === 'success' ? 'success' : 'error',
  );

  notification.textContent = message;
  body.append(notification);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', resolve);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('click', resolve);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const clickHandler = (evt) => {
    evt.preventDefault();

    if (evt.button === 0) {
      resolve();
    } else if (evt.button === 2) {
      resolve();
    }
    document.removeEventListener('mousedown', clickHandler);
    document.removeEventListener('contextmenu', clickHandler);
  };

  document.addEventListener('click', clickHandler);
  document.addEventListener('contextmenu', clickHandler);
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const clickHandler = (evt) => {
    evt.preventDefault();

    if (evt.button === 0) {
      leftClick = true;
    } else if (evt.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve();
      document.removeEventListener('mousedown', clickHandler);
      document.removeEventListener('contextmenu', clickHandler);
    }
  };

  document.addEventListener('click', clickHandler);
  document.addEventListener('contextmenu', clickHandler);
});

firstPromise
  .then(() => {
    showMessage('First promise was resolved', 'success');
  })
  .catch((e) => {
    showMessage(e.message, 'error');
  });

secondPromise.then(() => {
  showMessage('Second promise was resolved', 'success');
});

thirdPromise.then(() => {
  showMessage('Third promise was resolved', 'success');
});
