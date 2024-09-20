'use strict';

const promiseHandler = (text) => {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';

  if (!(text instanceof Error)) {
    notification.classList.add('success');
  } else {
    notification.classList.add('error');
  }
  notification.textContent = text;
  document.body.append(notification);
};

const firstPromise = new Promise((resolve, reject) => {
  let isClicked = false;

  document.addEventListener('click', () => {
    isClicked = true;
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    if (!isClicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let isLeftClick = false;
  let isRightClick = false;

  document.addEventListener('click', () => {
    isLeftClick = true;

    if (isLeftClick && isRightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    isRightClick = true;

    if (isLeftClick && isRightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then(promiseHandler).catch(promiseHandler);
secondPromise.then(promiseHandler);
thirdPromise.then(promiseHandler);
