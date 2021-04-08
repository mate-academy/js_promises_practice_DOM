'use strict';

function showMessage(className, innerText) {
  const message = document.createElement('div');

  message.className = className;
  message.innerText = innerText;
  message.dataset.qa = 'notification';

  document.body.append(message);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', resolve);
  setTimeout(() => reject(new Error()), 3000);
});

firstPromise
  .then(() => {
    showMessage('success', 'First promise was resolved');
  })
  .catch(() => {
    showMessage('warning', 'First promise was rejected');
  });

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (eventClick) => {
    if (eventClick.button === 0 || eventClick.button === 2) {
      resolve();
    }
  });
});

secondPromise
  .then(() => {
    showMessage('success', 'Second promise was resolved');
  });

const thirdPromise = new Promise((resolve, reject) => {
  let isLeftButtonClicked = false;
  let isRightButtonClicked = false;

  document.addEventListener('mousedown', (eventClick) => {
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
    showMessage('success', 'Third promise was resolved');
  });
