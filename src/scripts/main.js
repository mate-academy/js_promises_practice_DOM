'use strict';

let isLeftClicked = false;
let isRightClicked = false;

document.addEventListener('click', () => {
  isLeftClicked = true;
});

document.addEventListener('contextmenu', () => {
  isRightClicked = true;
});

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    if (isRightClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    if (isLeftClicked) {
      resolve('Third promise was resolved');
    }
  });
});

function appendMessage(message, isError = false) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');

  if (!isError) {
    div.className = 'success';
  } else {
    div.className = 'error';
  }

  div.textContent = message;
  document.body.appendChild(div);
}

firstPromise.then(appendMessage).catch((error) => {
  appendMessage(error, true);
});

secondPromise.then(appendMessage);

thirdPromise.then(appendMessage);
