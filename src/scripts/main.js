'use strict';

// promises
// 1
const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

// 2
const promise2 = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', mouseEvent => {
    mouseEvent.preventDefault();
    resolve('Second promise was resolved');
  });
});

// 3
const promise3 = new Promise((resolve) => {
  document.addEventListener('click', () => {
    document.addEventListener('contextmenu', mouseEvent => {
      mouseEvent.preventDefault();
      resolve('Third promise was resolved');
    });
  });

  document.addEventListener('contextmenu', () => {
    document.addEventListener('click', mouseEvent => {
      mouseEvent.preventDefault();
      resolve('Third promise was resolved');
    });
  });
});

// handlers
function handleSuccess(message) {
  const messageBox = document.createElement('div');

  messageBox.className = 'success';
  messageBox.setAttribute('data-qa', 'notification');
  messageBox.textContent = message;
  document.body.append(messageBox);
}

function handleError(error) {
  const messageBox = document.createElement('div');

  messageBox.className = 'error';
  messageBox.setAttribute('data-qa', 'notification');
  messageBox.textContent = error;
  document.body.append(messageBox);
}

// handling promises
promise1
  .then(result => handleSuccess(result))
  .catch(error => handleError(error));

promise2
  .then(result => handleSuccess(result));

promise3
  .then(result => handleSuccess(result));
