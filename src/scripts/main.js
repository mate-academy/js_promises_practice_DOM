'use strict';

const promise1 = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    reject(new Error('Promise was rejected'));
  }, 3000);

  const oneClick = () => {
    resolve('First promise was resolved');
    clearTimeout(timeout);
  };

  document.querySelector('body').addEventListener('click', oneClick);
});

const promise2 = new Promise((resolve) => {
  const leftClick = () => {
    resolve('Second promise was resolved');
    cleanUp();
  };
  const rightClick = () => {
    resolve('Second promise was resolved');
    cleanUp();
  };

  const cleanUp = () => {
    document.querySelector('body').removeEventListener('click', leftClick);

    document
      .querySelector('body')
      .removeEventListener('contextmenu', rightClick);
  };

  document.querySelector('body').addEventListener('click', leftClick);
  document.querySelector('body').addEventListener('contextmenu', rightClick);
});

const promise3 = Promise.all([promise1, promise2]).then(
  () => 'Third promise was resolved',
);

function createMessage(text, isError = false) {
  const messageDiv = document.createElement('div');

  messageDiv.setAttribute('data-qa', 'notification');
  messageDiv.classList.add(isError ? 'error' : 'success');
  messageDiv.textContent = text;
  document.body.appendChild(messageDiv);
}

promise1
  .then((message) => createMessage(message))
  .catch((error) => createMessage(error.message, true));

promise2.then((message) => createMessage(message));

promise3.then((message) => createMessage(message));
