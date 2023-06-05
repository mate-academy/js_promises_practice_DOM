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

function waitFor(evnt, number) {
  return new Promise((resolve) => {
    document.addEventListener(evnt, () => {
      resolve(`${number} promise was resolved`);
    });
  });
}

const thirdPromise = Promise.all(
  [waitFor('click', 'Third'),
    waitFor('contextmenu', 'Third')]);

const secondPromise = Promise.race(
  [waitFor('click', 'Second'),
    waitFor('contextmenu', 'Second')]);

firstPromise
  .then(result => {
    createNotification(result, 'success');
  })
  .catch(error => {
    createNotification(error, 'warning');
  });

secondPromise
  .then(result => {
    createNotification(result, 'success');
  });

thirdPromise
  .then(result => {
    createNotification(result, 'success');
  });
