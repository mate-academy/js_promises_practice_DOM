'use strict';

const bodyElement = document.body;

function addMessage(className, message) {
  bodyElement.insertAdjacentHTML('beforeend', `
    <div
      class="message ${className}"
      data-qa="notification"
    >
      ${message}
    </div>
  `);
}

const clickPromise = new Promise(resolve => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const contextMenuPromise = new Promise(resolve => {
  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved!');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected!'));
  }, 3000);
});

firstPromise
  .then(message => addMessage('success message--1', message))
  .catch(error => addMessage('error-message', error));

Promise.race([clickPromise, contextMenuPromise])
  .then(() => addMessage('success message--2', 'Second promise was resolved'));

Promise.all([clickPromise, contextMenuPromise])
  .then(() => addMessage('success message--3', 'Third promise was resolved'));
