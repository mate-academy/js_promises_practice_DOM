'use strict';

const messageElements = document.createElement('div');

messageElements.className = 'messages';
document.body.append(messageElements);

const createMessageElement = (className, message) => {
  const messageElement = document.createElement('div');

  messageElement.className = `ui ${className} message`;
  messageElement.textContent = message;
  messageElement.dataset.qa = 'notification';

  messageElements.append(messageElement);
};

const clickHandler = new Promise((resolve, reject) => {
  document.addEventListener('mouseup', resolve);
  setTimeout(() => reject(new Error()), 3000);
});

clickHandler
  .then(() => {
    createMessageElement('success', 'First promise was resolved');
  })
  .catch(() => {
    createMessageElement('warning negative', 'First promise was rejected');
  });

const LeftOrRightButtonsClickHandler = new Promise((resolve, reject) => {
  document.addEventListener('mouseup', (clickEvent) => {
    if (clickEvent.button === 0 || clickEvent.button === 2) {
      return resolve();
    }
  });
});

LeftOrRightButtonsClickHandler
  .then(() => {
    createMessageElement('success', 'Second promise was resolved');
  });

const LeftAndRightButtonsClickHandler = new Promise((resolve, reject) => {
  let wasLeftButtonClicked = false;
  let wasRightButtonClicked = false;

  document.addEventListener('mouseup', (clickEvent) => {
    if (clickEvent.button === 0) {
      wasLeftButtonClicked = true;
    }

    if (clickEvent.button === 2) {
      wasRightButtonClicked = true;
    }

    if (wasLeftButtonClicked && wasRightButtonClicked) {
      resolve();
    }
  });
});

LeftAndRightButtonsClickHandler
  .then(() => {
    createMessageElement('success', 'Third promise was resolved');
  });
