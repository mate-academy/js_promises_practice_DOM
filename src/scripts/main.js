'use strict';

let leftClicked = false;
let rightClicked = false;

const resolveEventListener = function(promise, resolve) {
  document.addEventListener('click', () => {
    resolve(`${promise} promise was resolved`);
  });
};

const createMessageDiv = function(className, message) {
  const createMessage = document.createElement('div');

  document.body.appendChild(createMessage);
  createMessage.setAttribute('data-qa', 'notification');
  createMessage.classList.add(className);
  createMessage.textContent = message;
};

const promise1 = new Promise((resolve, reject) => {
  resolveEventListener('First', resolve);

  setTimeout(() => {
    if (!leftClicked) {
      reject(Error('First promise was rejected'));
    }
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  resolveEventListener('Second', resolve);

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve) => {
  const resolveCheck = () => {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', () => {
    leftClicked = true;
    resolveCheck();
  });

  document.addEventListener('contextmenu', () => {
    rightClicked = true;
    resolveCheck();
  });
});

promise1
  .then((success) => {
    createMessageDiv('success', success);
  })
  .catch(() => {
    createMessageDiv('warning', 'First promise was rejected');
  });

promise2.then((success) => {
  createMessageDiv('success', success);
});

promise3.then((success) => {
  createMessageDiv('success', success);
});
