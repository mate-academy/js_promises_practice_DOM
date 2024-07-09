'use strict';

// #region first promise

const promise1 = new Promise((resolve, reject) => {
  let eventClick = false;

  document.addEventListener('click', () => {
    eventClick = true;
    resolve('First promise was resolved on a left click');
  });

  setTimeout(() => {
    if (!eventClick) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected');
    }
  }, 3000);
});

promise1
  .then((message) => {
    const notification = document.createElement('div');

    notification.classList.add('success');
    notification.setAttribute('data-qa', 'notification');
    notification.textContent = message;

    document.body.appendChild(notification);
  })
  .catch((error) => {
    const notification = document.createElement('div');

    notification.classList.add('error');
    notification.setAttribute('data-qa', 'notification');
    notification.textContent = error;

    document.body.appendChild(notification);
  });
// #endregion

// #region second promise

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

promise2.then((message) => {
  const notification = document.createElement('div');

  notification.classList.add('success');
  notification.setAttribute('data-qa', 'notification');
  notification.textContent = message;

  document.body.appendChild(notification);
});

// #endregion

// #region third promise

const promise3 = new Promise((resolve, reject) => {
  const isClicked = [];

  document.addEventListener('click', () => {
    isClicked.push('1');

    if (isClicked.includes('1') && isClicked.includes('2')) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    isClicked.push('2');

    if (isClicked.includes('1') && isClicked.includes('2')) {
      resolve('Third promise was resolved');
    }
  });
});

promise3.then((message) => {
  const notification = document.createElement('div');

  notification.classList.add('success');
  notification.setAttribute('data-qa', 'notification');
  notification.textContent = message;

  document.body.appendChild(notification);
});

// #endregion
