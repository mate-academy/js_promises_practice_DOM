'use strict';

const notification = document.createElement('div');

notification.classList = 'notification';
notification.style.backgroundColor = 'yellow';
notification.style.border = 'solid black 1px';
notification.style.position = 'absolute';
document.body.append(notification);

function firstPromise() {
  return new Promise((resolve, reject) => {
    document.body.addEventListener('click', () => {
      resolve();
    });
    setTimeout(reject, 3000);
  });
}

function secondPromise() {
  return new Promise((resolve) => {
    document.body.addEventListener('click', () => {
      resolve();
    });

    document.body.addEventListener('contextmenu', (promiseEvent) => {
      promiseEvent.preventDefault();
      resolve();
    });
  });
}

const thirdPromise1 = new Promise((resolve) => {
  document.body.addEventListener('click', () => {
    resolve();
  });
});

const thirdPromise2 = new Promise((resolve) => {
  document.body.addEventListener('contextmenu', (promiseEvent) => {
    promiseEvent.preventDefault();
    resolve();
  });
});

firstPromise()
  .then(() => {
    notification.textContent += ' First promise was resolved';
  })
  .catch(() => {
    notification.textContent += ' First promise was rejected';
  });

secondPromise()
  .then(() => {
    notification.textContent += ' Second promise was resolved';
  });

Promise.all([thirdPromise1, thirdPromise2])
  .then(() => {
    notification.textContent += ' Third promise was resolved';
  });
