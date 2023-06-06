'use strict';

const body = document.body;

function createNotification(message, classValue) {
  const notification = document.createElement('div');

  notification.setAttribute('data-qa', 'notification');
  notification.innerText = message;
  notification.classList = classValue;
  body.append(notification);
}

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(Error('First promise was rejected'));
  }, 3000);
});

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

firstPromise
  .then(result => {
    createNotification(result, 'success');
  })
  .catch(error => {
    createNotification(error, 'warning');
  });

const secondPromise = new Promise((resolve, reject) => {
  Promise.race([clickPromise, contextMenuPromise])
    .then((value) => resolve('Second promise was resolved'));
});

secondPromise
  .then(result => {
    createNotification(result, 'success');
  });

const thirdPromise = new Promise(resolve => {
  Promise.all([clickPromise, contextMenuPromise])
    .then((value) => resolve('Third promise was resolved'));
});

thirdPromise
  .then(result => {
    createNotification(result, 'success');
  });
