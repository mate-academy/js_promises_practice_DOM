'use strict';

const THREE_SECONDS = 3000;

const isLeftMouseButtonClickEvent = (e) => e.button === 0;
const isRightMouseButtonClickEvent = (e) => e.button === 2;

const documentLeftClickPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (isLeftMouseButtonClickEvent(e)) {
      resolve();
    }
  });
});

const documentRightClickPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (isRightMouseButtonClickEvent(e)) {
      resolve();
    }
  });
});

function showNotification(message, isError = false) {
  const messageDiv = document.createElement('div');

  messageDiv.setAttribute('data-qa', 'notification');

  if (isError) {
    messageDiv.classList.add('error');
  } else {
    messageDiv.classList.add('success');
  }

  messageDiv.textContent = message;
  document.body.appendChild(messageDiv);
}

const firstPromise = new Promise((resolve, reject) => {
  documentLeftClickPromise.then(() => resolve('First promise was resolved'));

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, THREE_SECONDS);
});

const secondPromise = Promise.any([
  documentLeftClickPromise,
  documentRightClickPromise,
]).then(() => 'Second promise was resolved');

const thirdPromise = Promise.all([
  documentLeftClickPromise,
  documentRightClickPromise,
]).then(() => 'Third promise was resolved');

firstPromise
  .then((result) => showNotification(result))
  .catch((error) => showNotification(error.message, true));

secondPromise.then((result) => showNotification(result));

thirdPromise.then((result) => showNotification(result));
