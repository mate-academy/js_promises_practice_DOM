'use strict';

function addMessage(textMessage, classMessage) {
  const block = document.createElement('div');

  block.classList = classMessage;
  block.dataset.qa = 'notification';
  block.textContent = textMessage;
  document.querySelector('body').append(block);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () =>
    resolve());

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

firstPromise.then(() => {
  addMessage('First promise was resolved', 'succes');
}).catch(() => {
  addMessage('First promise was rejected', 'warning');
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (el) => {
    if (el.button === 0 || el.button === 2) {
      resolve();
    }
  });
});

secondPromise.then(() => {
  addMessage('Second promise was resolved', 'succes');
});

const thirdPromise = new Promise((resolve) => {
  let leftButton = false;
  let rightButton = false;

  document.addEventListener('mousedown', (el) => {
    if (el.button === 0) {
      leftButton = true;
    }

    if (el.button === 2) {
      rightButton = true;
    };

    if (leftButton && rightButton) {
      resolve();
    }
  });
});

thirdPromise.then(() => {
  addMessage('Third promise was resolved', 'succes');
});
