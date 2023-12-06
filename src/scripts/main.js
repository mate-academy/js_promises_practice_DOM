'use strict';

const notificationDiv = document.createElement('div');

notificationDiv.setAttribute('data-qa', 'notification');

document.body.appendChild(notificationDiv);

function onSuccess(message) {
  notificationDiv.textContent = message;
  notificationDiv.className = 'success';
}

function onError(message) {
  notificationDiv.textContent = message;
  notificationDiv.className = 'warning';
}

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    resolve('Second promise was resolved');
  });
});

const thirdPromise = Promise.all([
  new Promise((resolve) => {
    document.addEventListener('click', () => {
      resolve(true);
    });
  }),
  new Promise((resolve) => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      resolve(true);
    });
  }),
]);

firstPromise
  .then((message) => {
    onSuccess(message);
  })
  .catch((err) => {
    onError(err);
  });

secondPromise.then((message) => {
  onSuccess(message);
});

thirdPromise.then(() => {
  onSuccess('Third promise was resolved');
});
