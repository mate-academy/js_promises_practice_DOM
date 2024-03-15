'use strict';

const body = document.querySelector('body');
const error1Message = 'First promise was rejected';
const success1Message = 'First promise was resolved';
const success2Message = 'Second promise was resolved';
const success3Message = 'Third promise was resolved';

function createNotification(message, className) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.className = className;
  notification.innerText = message;

  body.append(notification);
}

function successHandler(message) {
  createNotification(message, 'success');
};

function errorHandler(message) {
  createNotification(message, 'error');
};

const timeOutPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(Error);
  }, 3000);
});

const leftClickPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const rightClickPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    resolve();
  });
});

const firstPromise = new Promise((resolve, reject) => {
  Promise.race([leftClickPromise, timeOutPromise])
    .then(() => {
      resolve(success1Message);
    })
    .catch(() => {
      reject(new Error(error1Message));
    });
});

const secondPromise = new Promise((resolve) => {
  Promise.any([leftClickPromise, rightClickPromise])
    .then(() => {
      resolve(success2Message);
    });
});

const thirdPromise = new Promise((resolve) => {
  Promise.all([leftClickPromise, rightClickPromise])
    .then(() => {
      resolve(success3Message);
    });
});

[firstPromise, secondPromise, thirdPromise]
  .forEach(promise => {
    promise.then((message) => {
      successHandler(message);
    })
      .catch((error) => {
        errorHandler(error.message);
      });
  });
