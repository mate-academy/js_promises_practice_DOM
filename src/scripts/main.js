'use strict';

const bodyElement = document.querySelector('body');

bodyElement.addEventListener('contextmenu', (action) => {
  action.preventDefault();
});

// Messages classes-------------------------------------------------------------
const messageClass = 'message';
const secondMessageClass = 'message second-message';
const thirdMessageClass = 'message third-message';
const errorMessageClass = 'message error-message';

// Messages types---------------------------------------------------------------
const resolvedMessage = 'First promise was resolved';
const rejectedMessage = 'First promise was rejected';
const secondResolveMessage = 'Second promise was resolved';
const thirdPromiseMessage = 'Third promise was resolved';

// Show messages function-------------------------------------------------------
function showMessage(classType, MessageType) {
  bodyElement.insertAdjacentHTML('beforeend', `
        <div
          class="${classType}"
          data-qa="notification"
        >
          ${MessageType}
        </div>
    `);
}

// Realizing firstPromise-------------------------------------------------------
const firstPromise = new Promise((resolve, reject) => {
  bodyElement.addEventListener('mousedown', (action) => {
    if (action.button === 0) {
      resolve();
    }
  });

  setTimeout(() => reject(new Error()), 3000);
});

firstPromise
  .then(() => showMessage(messageClass, resolvedMessage))
  .catch(() => showMessage(errorMessageClass, rejectedMessage));

// Realizing secondPromise------------------------------------------------------
const secondPromise = new Promise((resolve) => {
  bodyElement.addEventListener('mousedown', (action) => {
    if (action.button === 0 || action.button === 2) {
      resolve();
    }
  });
});

secondPromise.then(() => showMessage(secondMessageClass, secondResolveMessage));

// Realizing thirdPromise-------------------------------------------------------
const thirdPromise = new Promise((resolve) => {
  bodyElement.addEventListener('mousedown', (actionOne) => {
    bodyElement.addEventListener('mousedown', (actionTwo) => {
      if ((actionOne.button === 0 && actionTwo.button === 2)
            || (actionOne.button === 2 && actionTwo.button === 0)) {
        resolve();
      }
    });
  });
});

thirdPromise.then(() => showMessage(thirdMessageClass, thirdPromiseMessage));
