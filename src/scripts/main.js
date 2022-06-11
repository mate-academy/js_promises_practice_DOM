'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (browserEvent) => {
    if (browserEvent.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (browserEvent) => {
    if (browserEvent.button === 0) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (browserEvent) => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', (browserEvent) => {
    if (browserEvent.button === 0) {
      document.addEventListener('contextmenu', () => {
        resolve('Third promise was resolved');
      });
    }
  });

  document.addEventListener('contextmenu', () => {
    document.addEventListener('click', (browserEvent) => {
      if (browserEvent.button === 0) {
        resolve('Third promise was resolved');
      }
    });
  });
});

function getNotification(result) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.innerHTML = result;
  document.body.append(div);

  return div;
}

function getNotificationSuccess(result) {
  getNotification(result).classList.add('success');
}

function getNotificationWarning(result) {
  getNotification(result).classList.add('warning');
}

firstPromise
  .then(result => getNotificationSuccess(result))
  .catch(result => getNotificationWarning(result));

secondPromise
  .then(result => getNotificationSuccess(result));

thirdPromise
  .then(result => getNotificationSuccess(result));
