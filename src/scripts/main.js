'use strict';

function handlePromiseResult(message, isReject = false) {
  const notificationClass = isReject
    ? 'success'
    : 'warning';

  document.body.insertAdjacentHTML(
    'beforeend',
    `
      <div data-qa="notification" class="${notificationClass}">
        ${message}
      </div>
    `
  );
}

const createTimer3000msPromise = (fulfillMessage) => (
  new Promise((resolve, reject) => (
    setTimeout(() => reject(Error(fulfillMessage)), 3000)
  ))
);

const createLeftMouseClickPromise = (fulfillMessage) => (
  new Promise((resolve, reject) => {
    document.addEventListener('click', () => (
      resolve(fulfillMessage)
    ));
  })
);

const createRightMouseClickPromise = (fulfillMessage) => (
  new Promise((resolve, reject) => {
    document.addEventListener('contextmenu', (rightMouseClickEvent) => {
      rightMouseClickEvent.preventDefault();
      resolve(fulfillMessage);
    });
  })
);

const firstPromise = Promise.race(
  [
    createLeftMouseClickPromise('First promise was resolved'),
    createTimer3000msPromise('First promise was rejected'),
  ]
);
const secondPromise = Promise.race(
  [
    createLeftMouseClickPromise('Second promise was resolved'),
    createRightMouseClickPromise('Second promise was resolved'),
  ]
);
const thirdPromise = Promise.all(
  [
    createLeftMouseClickPromise('Third promise was resolved'),
    createRightMouseClickPromise('Third promise was resolved'),
  ]
);

firstPromise
  .then((result) => handlePromiseResult(result))
  .catch((error) => handlePromiseResult(error.message, true));

secondPromise
  .then((result) => handlePromiseResult(result));

thirdPromise
  .then(([firstResult]) => handlePromiseResult(firstResult));
