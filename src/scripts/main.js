'use strict';

const promise1 = new Promise((resolve, reject) => {
  const logo = document.querySelector('.logo');

  logo.addEventListener('click', () => {
    resolve();
  });
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    const error = new Error('Promise rejected after 3 seconds');

    reject(error);
  }, 3000);
});

promise1
  .then(() => {
    const messageDiv = document.createElement('div');

    messageDiv.className = 'message';
    messageDiv.textContent = 'Promise was resolved!';
    document.body.appendChild(messageDiv);
  })
  .catch(() => {
    const errorMessageDiv = document.createElement('div');

    errorMessageDiv.className = 'message error-message';
    errorMessageDiv.textContent = 'Promise was rejected!';
    document.body.appendChild(errorMessageDiv);
  });

promise2
  .then(() => {
    const messageDiv = document.createElement('div');

    messageDiv.className = 'message';
    messageDiv.textContent = 'Promise was resolved!';
    document.body.appendChild(messageDiv);
  })
  .catch(() => {
    const errorMessageDiv = document.createElement('div');

    errorMessageDiv.className = 'message error-message';
    errorMessageDiv.textContent = 'Promise was rejected!';
    document.body.appendChild(errorMessageDiv);
  });
