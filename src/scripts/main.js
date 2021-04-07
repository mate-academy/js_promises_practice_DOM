'use strict';

const logo = document.querySelector('.logo');

function showMessage(className, innerText, notificationMessage) {
  const message = document.createElement('div');

  message.className = className;
  message.innerText = innerText;
  message.setAttribute('data-qa', notificationMessage);

  document.body.append(message);
}

const firstPromise = new Promise((resolve, reject) => {
  logo.addEventListener('click', resolve);
  setTimeout(() => reject(new Error()), 3000);
});

firstPromise
  .then(() => {
    showMessage('message', 'First promise was resolved');
  })
  .catch(() => {
    showMessage('error-message', 'First promise was rejected', 'warning');
  });

const secondPromise = new Promise((resolve, reject) => {
  logo.addEventListener('click', resolve);
  logo.addEventListener('contextmenu', resolve);
});

secondPromise
  .then(() => {
    showMessage('message', 'Second promise was resolved');
  })
  .catch(() => {
    showMessage('error-message', 'Second promise was rejected', 'warning');
  });

// another way second Promise
// const secondPromise = new Promise((resolve, reject) => {
//   logo.addEventListener('mousedown', (eventClick) => {
//     if (eventClick.button === 0 || eventClick.button === 2) {
//       resolve();
//     }
//   });
// });

// secondPromise
//   .then(() => {
//     showMessage('message', 'Second - resolved');
//   });

const thirdPromise = new Promise((resolve, reject) => {
  let leftClickButton = false;
  let rightClickButton = false;

  logo.addEventListener('mousedown', (eventClick) => {
    if (eventClick.button === 0) {
      leftClickButton = true;
    }

    if (eventClick.button === 2) {
      rightClickButton = true;
    }

    if (leftClickButton && rightClickButton) {
      resolve();
    }
  });
});

thirdPromise
  .then(() => {
    showMessage('message', 'Third promise was resolved', 'success');
  })
  .catch(() => {
    showMessage('error-message', 'Third promise was rejected', 'warning');
  });
