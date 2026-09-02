'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve(`Second promise was resolved`);
    }
  };

  document.addEventListener('mousedown', handler);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = 0;
  let rightClicked = 0;
  const handler = (e) => {
    if (e.button === 0) {
      leftClicked++;
    } else if (e.button === 2) {
      rightClicked++;
    }

    if (leftClicked > 0 && rightClicked > 0) {
      resolve(`Third promise was resolved`);
    }
  };

  document.addEventListener('mousedown', handler);
});

firstPromise
  .then((success) => {
    const messageDiv = document.createElement('div');

    messageDiv.className = 'success';
    messageDiv.setAttribute('data-qa', 'notification');
    messageDiv.textContent = success;
    document.body.appendChild(messageDiv);
  })
  .catch((error) => {
    const errorDiv = document.createElement('div');

    errorDiv.className = 'error';
    errorDiv.setAttribute('data-qa', 'notification');
    errorDiv.textContent = error;
    document.body.appendChild(errorDiv);
  });

secondPromise.then((success) => {
  const messageDiv = document.createElement('div');

  messageDiv.className = 'success';
  messageDiv.setAttribute('data-qa', 'notification');
  messageDiv.textContent = success;
  document.body.appendChild(messageDiv);
});

thirdPromise.then((success) => {
  const messageDiv = document.createElement('div');

  messageDiv.className = 'success';
  messageDiv.setAttribute('data-qa', 'notification');
  messageDiv.textContent = success;
  document.body.appendChild(messageDiv);
});
