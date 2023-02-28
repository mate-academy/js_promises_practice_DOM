'use strict';

const body = document.querySelector('body');

const firstPromise = (resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve();
    }
  });

  setTimeout(() => {
    reject();
  }, 3000);
};

const secondPromise = (resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve();
    }
  });
};

const thirdPromise = (resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (rightClick && leftClick) {
      resolve();
    }
  });
};

const promise1 = new Promise(firstPromise);
const promise2 = new Promise(secondPromise);
const promise3 = new Promise(thirdPromise);

promise1
  .then(result => {
    createNotification('success', 'First');
  })
  .catch(result => {
    createNotification('error', 'First');
  });

promise2
  .then(result => {
    createNotification('success', 'Second');
  });

promise3
  .then(result => {
    createNotification('success', 'Third');
  });

function createNotification(className, numberOfPromise) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';

  className === 'success'
    ? notification.className = 'success'
    : notification.className = 'warning';

  className === 'success'
    ? notification.innerText = `${numberOfPromise} promise was resolved`
    : notification.innerText = `${numberOfPromise} promise was rejected`;

  body.append(notification);
}
