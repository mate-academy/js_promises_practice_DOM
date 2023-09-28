'use strict';

function createMessage(messageText, isError = false) {
  const messageDiv = document.createElement('div');

  messageDiv.className = isError ? 'message error-message' : 'message';
  messageDiv.textContent = messageText;
  document.body.appendChild(messageDiv);
}

const promise1 = new Promise((resolve) => {
  const logo = document.querySelector('.logo');

  logo.addEventListener('click', resolve);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    const error = new Error('Promise rejected after 3 seconds');

    reject(error);
  }, 3000);
});

promise1
  .then(() => createMessage('Promise was resolved!'))
  .catch(() => createMessage('Promise was rejected!', true));

promise2
  .then(() => createMessage('Promise was resolved!'))
  .catch(() => createMessage('Promise was rejected!', true));
