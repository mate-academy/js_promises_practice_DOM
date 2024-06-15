'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  const message = 'Second promise was resolved';

  document.body.addEventListener('click', () => resolve(message));

  document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve(message);
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', (e) => resolve(e.button));

  document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve(e.button);
  });
}).then(
  (button) =>
    new Promise((resolve, reject) => {
      const message = 'Third promise was resolved';

      if (button === 2) {
        document.body.addEventListener('click', () => resolve(message));
      }

      if (button === 0) {
        document.body.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          resolve(message);
        });
      }
    }),
);

firstPromise
  .then((result) => handlerSuccess(result))
  .catch((error) => handlerError(error.message));

secondPromise.then((result) => handlerSuccess(result));

thirdPromise.then((result) => handlerSuccess(result));

function handlerSuccess(message) {
  showNotification(message, 'success');
}

function handlerError(message) {
  showNotification(message, 'error');
}

function showNotification(message, type) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(type);
  div.textContent = message;
  document.body.appendChild(div);
}
