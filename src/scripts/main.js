'use strict';

const message = document.createElement('div');

message.id = 'message';
message.dataset.qa = 'notification';
message.style.top = '100px';
message.style.right = '100px';
message.style.position = 'absolute';

document.body.append(message);

const showMessage = (description, type) => {
  const newBlock = document.createElement('div');

  newBlock.classList.add(type);
  newBlock.textContent = description;

  document.getElementById('message').append(newBlock);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve('First promise - done!');
  });

  setTimeout(() => reject(new Error('First promise - error!')), 3000);
});

const secondPromise = new Promise(resolve => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise - done!');
    }
  });
});

const thirdPromise = new Promise(resolve => {
  let leftButton = false;
  let rightButton = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftButton = true;
    }

    if (e.button === 2) {
      rightButton = true;
    }

    if (leftButton && rightButton) {
      resolve('Third promise - done!');
    }
  });
});

firstPromise
  .then(() => {
    showMessage(`First promise was resolved`, `success`);
  })
  .catch(() => {
    showMessage(`First promise was rejected`, `warning`);
  });

secondPromise
  .then(() => {
    showMessage(`Second promise was resolved`, `success`);
  });

thirdPromise
  .then(() => {
    showMessage(`Third promise was resolved`, `success`);
  });
