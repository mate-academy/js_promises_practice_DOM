'use strict';

let clicked = false;

function showMessage(text, type) {
  const message = document.createElement('div');

  message.dataset.qa = 'notification';
  message.classList.add('message');

  if (type === 'error') {
    message.classList.add('error-message');
  } else {
    message.classList.add('success');
  }

  message.textContent = text;
  document.body.appendChild(message);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      clicked = true;
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    if (!clicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

firstPromise
  .then(() => {
    showMessage('First promise was resolved', 'success');
  })
  .catch(() => {
    showMessage('First promise was rejected', 'error');
  });

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise.then(() => {
  showMessage('Second promise was resolved', 'success');
}).catch(() => {
  showMessage('Second promise was rejected', 'error');
});

let rightClicked = false;
let leftClicked = false;

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (rightClicked === true && leftClicked === true) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then(() => {
  showMessage('Third promise was resolved', 'success');
});
