'use strict';

let leftClicked = false;
let rightClicked = false;

const showSuccess = (message) => {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.className = 'success';
  notification.textContent = message;

  document.body.append(notification);
};

const showError = (error) => {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';
  notification.className = 'error';
  notification.textContent = error.message;

  document.body.append(notification);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener(
    'click',
    () => {
      resolve('First promise was resolved');
    },
    { once: true },
  );

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener(
    'click',
    () => {
      resolve('Second promise was resolved');
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    () => {
      resolve('Second promise was resolved');
    },
    { once: true },
  );
});

const thirdPromise = new Promise((resolve) => {
  const checkClicks = () => {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', () => {
    leftClicked = true;
    checkClicks();
  });

  document.addEventListener('contextmenu', () => {
    rightClicked = true;
    checkClicks();
  });
});

firstPromise.then(showSuccess).catch(showError);
secondPromise.then(showSuccess).catch(showError);
thirdPromise.then(showSuccess).catch(showError);
