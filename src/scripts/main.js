'use strict';

function createMessage(result, text) {
  const message = document.createElement('div');

  message.className = result;
  message.dataset.qa = 'notification';
  message.innerText = text;
  document.body.append(message);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    e.preventDefault();

    if (e.button === 0 || e.button === 1 || e.button === 2) {
      resolve();
    }
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    e.preventDefault();

    if (e.button === 0 || e.button === 2) {
      resolve();
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let pressedRight = false;
  let pressedLeft = false;

  document.addEventListener('mousedown', (e) => {
    e.preventDefault();

    if (e.button === 0) {
      pressedLeft = true;
    }

    if (e.button === 2) {
      pressedRight = true;
    }

    if (pressedRight && pressedLeft) {
      resolve();
    }
  });
});

firstPromise.then(() => {
  createMessage('success', 'First promise was resolved!');
}).catch(() => {
  createMessage('warning', 'First promise was rejected!');
});

secondPromise.then(() => {
  createMessage('success', 'Second promise was resolved!');
});

thirdPromise.then(() => {
  createMessage('success', 'Third promise was resolved!');
});
