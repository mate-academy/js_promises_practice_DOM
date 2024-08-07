'use strict';

const body = document.querySelector('body');

const showNotification = document.createElement('div');
const text = document.createElement('p');

showNotification.appendChild(text);
showNotification.setAttribute('data-qa', 'notification');

// showNotification.style.

// showNotification.style.display = 'none';

// # Promises practice
// Create 3 promises:
// - The `firstPromise` should be
//   - **resolved** with a message `First promise was resolved`
//   on a left`click` in the`document`

//   - **rejected** with a message `First promise was rejected`
//   in 3 seconds if not clicked

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(
    () => reject(new Error('First promise was rejected')),
    3000,
  );

  document.addEventListener('click', () => {
    clearTimeout(timerId);
    resolve('First promise was resolved');
  });
});

firstPromise.then((message) => {
  text.textContent = message;
  showNotification.style.display = 'block';
  showNotification.style.color = 'green';
  showNotification.style.backgroundColor = 'black';
  body.appendChild(showNotification);
});

firstPromise.catch((message) => {
  text.textContent = message;
  showNotification.style.display = 'block';
  showNotification.style.color = 'red';
  showNotification.style.backgroundColor = 'white';
  body.appendChild(showNotification);
});

// - The `secondPromise` should be:
//   - **resolved** only on `left` or `right` click in the `
//   document` with a message `Second promise was resolved`

//   - never **rejected**
// - The `thirdPromise` should be **resolved** with a message
//  `Third promise was resolved` only after both `left` and
//  `right` clicks happened

// Add `success` and `error` handlers to each promise to show
// `<div data-qa="notification">` with `success` or `error`
//  class and a promise message.
