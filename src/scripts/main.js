'use strict';

const promise1 = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected in 3 seconds'));
  }, 3000);

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      clearTimeout(timeoutId);
      resolve('First promise was resolved on a left click in the document');
    }
  });
});

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const promise3 = new Promise((resolve, reject) => {
  let right = false;
  let left = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      left = true;
    }

    if (e.button === 2) {
      right = true;
    }

    if (right && left) {
      resolve('Third promise was resolved');
    }
  });
});

promise1
  .then((message) => {
    const resolveMessage = document.createElement('div');

    resolveMessage.setAttribute('data-qa', 'notification');
    resolveMessage.className = 'success';
    resolveMessage.textContent = message;
    document.body.appendChild(resolveMessage);
  })
  .catch((error) => {
    const errorMessage = document.createElement('div');

    errorMessage.setAttribute('data-qa', 'notification');
    errorMessage.className = 'error';
    errorMessage.textContent = error.message;
    document.body.appendChild(errorMessage);
  });

promise2
  .then((message) => {
    const resolveMessage = document.createElement('div');

    resolveMessage.setAttribute('data-qa', 'notification');
    resolveMessage.className = 'success';
    resolveMessage.textContent = message;
    document.body.appendChild(resolveMessage);
  })
  .catch(() => {
    // Never reject
  });

promise3
  .then((message) => {
    const resolveMessage = document.createElement('div');

    resolveMessage.setAttribute('data-qa', 'notification');
    resolveMessage.className = 'success';
    resolveMessage.textContent = message;
    document.body.appendChild(resolveMessage);
  })
  .catch(() => {
    // Do nothing
  });
