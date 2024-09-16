'use strict';

document.addEventListener('contextmenu', (rc) => {
  rc.preventDefault();
});

const firstPromise = new Promise((resolve, reject) => {
  const clicked = document.documentElement;

  clicked.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});

const notification = document.createElement('div');

notification.setAttribute('data-qa', 'notification');
notification.style.padding = '15px';
notification.style.background = 'yellow';

firstPromise
  .then((result) => {
    notification.innerHTML = result;
    document.body.appendChild(notification);
  })
  .catch((reject) => {
    notification.innerHTML = reject;
    document.body.appendChild(notification);
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const secondNotification = document.createElement('div');

secondNotification.setAttribute('data-qa', 'notification');
secondNotification.style.padding = '15px';
secondNotification.style.background = 'green';

secondPromise.then((result) => {
  secondNotification.innerHTML = result;
  document.body.appendChild(secondNotification);
});

const thirdPromise = new Promise((resolve) => {
  const buttonPressed = {
    left: false,
    right: false,
  };

  const checkButtons = () => {
    if (buttonPressed.left === true && buttonPressed.right === true) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      buttonPressed.left = true;
      checkButtons();
    } else if (e.button === 2) {
      buttonPressed.right = true;
      checkButtons();
    }
  });
});

const thirdNotification = document.createElement('div');

thirdNotification.setAttribute('data-qa', 'notification');
thirdNotification.style.padding = '15px';
thirdNotification.style.background = 'red';

thirdPromise.then((result) => {
  thirdNotification.innerHTML = result;
  document.body.appendChild(thirdNotification);
});
