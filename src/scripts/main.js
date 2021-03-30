'use strict';

function addMessage(className, text) {
  const message = document.createElement('div');

  message.innerText = text;
  message.dataset.qa = 'notification';
  message.classList.add(className);
  document.body.append(message);
}

const promiseOne = new Promise((resolve, reject) => {
  document.addEventListener('click', resolve);

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

promiseOne
  .then(() => {
    addMessage('success', 'First promise was resolved');
  })
  .catch(() => {
    addMessage('warning', 'First promise was rejected');
  });

const promiseTwo = new Promise(resolve => {
  document.addEventListener('mousedown', (mouseEvent) => {
    if (mouseEvent.button === 0 || mouseEvent.button === 2) {
      resolve();
    }
  });
});

promiseTwo
  .then(() => {
    addMessage('success', 'Second promise was resolved');
  });

const proviseThree = new Promise(resolve => {
  let hasPressLeftButton = false;
  let hasPressRightButton = false;

  document.addEventListener('mousedown', (mouseEvent) => {
    if (mouseEvent.button === 0) {
      hasPressLeftButton = true;
    }

    if (mouseEvent.button === 2) {
      hasPressRightButton = true;
    }

    if (hasPressLeftButton && hasPressRightButton) {
      resolve();
    }
  });
});

proviseThree
  .then(() => {
    addMessage('success', 'Third promise was resolved');
  });
