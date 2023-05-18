'use strict';

let leftClick = false;
let rightClick = false;

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
    leftClick = true;
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  document.addEventListener('click', () => {
    leftClick = true;
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve) => {
  document.addEventListener('mousedown', () => {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

function showMessage(message) {
  const tag = document.createElement('div');

  if (message.includes('resolved')) {
    tag.classList.add('message');
  } else {
    tag.classList.add('warning');
  }

  tag.setAttribute('data-qa', 'notification');

  const text = document.createTextNode(message);

  tag.appendChild(text);

  document.body.appendChild(tag);
}

promise1
  .then((resolveMessage) => {
    showMessage(resolveMessage);
  })
  .catch((errorMessage) => {
    showMessage(errorMessage);
  });

promise2
  .then((resolveMessage) => {
    showMessage(resolveMessage);
  });

promise3
  .then((resolveMessage) => {
    showMessage(resolveMessage);
  });
