'use strict';

const logo = document.querySelector('.logo');

function showMessage(className, innerText) {
  const message = document.createElement('div');

  message.className = className;
  message.innerText = innerText;
  message.dataset.qa = 'notification';

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
  logo.addEventListener('mousedown', (eventClick) => {
    if (eventClick.button === 0 || eventClick.button === 2) {
      resolve();
    }
  });
});

secondPromise
  .then(() => {
    showMessage('message', 'Second promise was resolved');
  })
  .catch(() => {
    showMessage('error-message', 'Second promise was rejected', 'warning');
  });

const thirdPromise = new Promise((resolve, reject) => {
  let isLeftButtonClicked = false;
  let isRightButtonClicked = false;

  logo.addEventListener('mousedown', (eventClick) => {
    if (eventClick.button === 0) {
      isLeftButtonClicked = true;
    }

    if (eventClick.button === 2) {
      isRightButtonClicked = true;
    }

    if (isLeftButtonClicked && isRightButtonClicked) {
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
