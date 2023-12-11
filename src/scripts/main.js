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

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    resolve('First promise was resolved!');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected!'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  bodyElement.addEventListener('mouseup', (e) => {
    e.preventDefault();

    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const clickHandler = (e) => {
    e.preventDefault();

    if (e.button === 0) {
      leftClick = true;
    } else if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  };

  bodyElement.addEventListener('mouseup', clickHandler);
});

firstPromise
  .then(message => addMessage('success message--1', message))
  .catch(error => addMessage('error-message', error));

secondPromise
  .then(message => addMessage('success message--2', message));

thirdPromise
  .then(message => addMessage('success message--3', message));
