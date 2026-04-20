'use strict';

const notification = document.createElement('div');

notification.dataset.qa = 'notification';
document.body.appendChild(notification);

const showSuccess = (message) => {
  notification.className = 'success';
  notification.textContent = message;
};

const showError = (message) => {
  notification.className = 'error';
  notification.textContent = message;
};

let leftClicked = false;

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    if (!leftClicked) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected');
    }
  }, 3000);

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClicked = true;
      clearTimeout(timer);
      resolve('First promise was resolved');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = Promise.all([firstPromise, secondPromise]).then(
  () => 'Third promise was resolved',
);

// let left = false;
// let right = false;

// const thirdPromise = new Promise((resolve) => {
//   document.addEventListener('mousedown', (e) => {
//     if (e.button === 0) {
//       left = true;
//     }

//     if (e.button === 2) {
//       right = true;
//     }

//     if (left && right) {
//       resolve('Third promise was resolved');
//     }
//   });
// });

firstPromise.then(showSuccess).catch(showError);
secondPromise.then(showSuccess).catch(showError);
thirdPromise.then(showSuccess).catch(showError);
