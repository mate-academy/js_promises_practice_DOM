/* eslint-disable prefer-promise-reject-errors */
'use strict';

const page = document.querySelector('body');

page.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const createNotification = (text, type) => {
  const notification = document.createElement('div');

  notification.setAttribute('class', 'notification');
  notification.setAttribute('data-qa', 'notification');
  notification.textContent = text;

  if (type === 'error') {
    notification.classList.add('error');
  } else {
    notification.classList.add('success');
  }

  page.append(notification);
};

const promise1 = new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(), 3000);

  page.addEventListener('click', () => {
    clearTimeout(timer);
    resolve();
  });
});

const promise2 = new Promise((resolve, reject) => {
  page.addEventListener('click', () => {
    resolve();
  });

  page.addEventListener('contextmenu', () => {
    resolve();
  });
});

const promise3 = new Promise((resolve, reject) => {
  let isLeftClicked = false;
  let isRightClicked = false;

  page.addEventListener('click', () => {
    isLeftClicked = true;

    if (isLeftClicked && isRightClicked) {
      resolve();
    }
  });

  page.addEventListener('contextmenu', () => {
    isRightClicked = true;

    if (isLeftClicked && isRightClicked) {
      resolve();
    }
  });
});

promise1
  .then(() => {
    createNotification('First promise was resolved', 'success');
  })
  .catch(() => createNotification('First promise was rejected', 'error'));

promise2.then(() => {
  createNotification('Second promise was resolved', 'success');
});

promise3.then(() => {
  createNotification('Third promise was resolved', 'success');
});
