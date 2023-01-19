'use strict';

const bodyElement = document.querySelector('body');

bodyElement.addEventListener('contextmenu', (action) => {
  action.preventDefault();
});

function showMessage(classType, message) {
  bodyElement.insertAdjacentHTML('beforeend', `
    <div
      class="${classType}"
      data-qa="notification"
    >
      ${message}
    </div>
  `);
}

const firstPromise = new Promise((resolve, reject) => {
  bodyElement.addEventListener('mousedown', (action) => {
    if (action.button === 0) {
      resolve();
    }
  });

  setTimeout(() => reject(new Error()), 3000);
});

firstPromise
  .then(() => showMessage('message', 'First promise was resolved'))
  .catch(
    () => showMessage('message error-message', 'First promise was rejected'));

const secondPromise = new Promise((resolve) => {
  bodyElement.addEventListener('mousedown', (action) => {
    if (action.button === 0 || action.button === 2) {
      resolve();
    }
  });
});

secondPromise.then(
  () => showMessage('message second-message', 'Second promise was resolved'));

const thirdPromise = new Promise((resolve) => {
  let leftClickCheck = false;
  let rightClickCheck = false;

  bodyElement.addEventListener('mousedown', (action) => {
    switch (action.button) {
      case 0:
        leftClickCheck = true;
        break;
      case 2:
        rightClickCheck = true;
    }

    if (leftClickCheck && rightClickCheck) {
      resolve();
    }
  });
});

thirdPromise.then(
  () => showMessage('message third-message', 'Third promise was resolved'));
