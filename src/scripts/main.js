'use strict';

const firstPromiseSuccessMessage = document.createElement('div');
const firstPromiseErrorMessage = document.createElement('div');
const secondPromiseMessage = document.createElement('div');
const thirdPromiseMessage = document.createElement('div');

firstPromiseSuccessMessage.textContent = 'First promise was resolved';
firstPromiseSuccessMessage.className = 'success';
firstPromiseSuccessMessage.dataset.qa = 'notification';

firstPromiseErrorMessage.textContent = 'First promise was rejected';
firstPromiseErrorMessage.className = 'warning';
firstPromiseErrorMessage.dataset.qa = 'notification';

secondPromiseMessage.textContent = 'Second promise was resolved';
secondPromiseMessage.className = 'success';
secondPromiseMessage.dataset.qa = 'notification';

thirdPromiseMessage.textContent = 'Third promise was resolved';
thirdPromiseMessage.className = 'success';
thirdPromiseMessage.dataset.qa = 'notification';

new Promise((resolve, reject) => {
  document.addEventListener('mousedown', resolve);

  setTimeout(reject, 3000);
}).then(
  () => document.body.append(firstPromiseSuccessMessage),
  () => document.body.append(firstPromiseErrorMessage),
);

new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve();
    }
  });
}).then(
  () => document.body.append(secondPromiseMessage),
);

new Promise((resolve) => {
  let leftButtonPressed = false;
  let rightButtonPressed = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 2) {
      rightButtonPressed = true;
    }

    if (e.button === 0) {
      leftButtonPressed = true;
    }

    if (leftButtonPressed && rightButtonPressed) {
      resolve();
    }
  });

  document.addEventListener('mouseup', (e) => {
    if (e.button === 2) {
      rightButtonPressed = false;
    }

    if (e.button === 0) {
      leftButtonPressed = false;
    }
  });
}).then(
  () => document.body.append(thirdPromiseMessage),
);
