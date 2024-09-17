'use strict';

const resolver1 = (resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve();
    }
  });

  setTimeout(() => {
    reject();
  }, 3000);
};

const resolver2 = (resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve();
    }
  });
};

const resolver3 = (resolve) => {
  document.addEventListener('mousedown', (e1) => {
    document.addEventListener('mousedown', (e2) => {
      if ((e1.button === 0 && e2.button === 2)
      || (e2.button === 0 && e1.button === 2)) {
        resolve();
      }
    });
  });
};

const promise1 = new Promise(resolver1);
const promise2 = new Promise(resolver2);
const promise3 = new Promise(resolver3);

promise1
  .then(() => {
    createNotification('success', 'First');
  })
  .catch(() => {
    createNotification('error', 'First');
  });

promise2
  .then(() => {
    createNotification('success', 'Second');
  });

promise3
  .then(() => {
    createNotification('success', 'Third');
  });

function createNotification(className, numberOfPromise) {
  const notification = document.createElement('div');

  notification.dataset.qa = 'notification';

  className === 'success'
    ? notification.innerText = `${numberOfPromise} promise was resolved`
    : notification.innerText = `${numberOfPromise} promise was rejected`;

  className === 'success'
    ? notification.className = 'success'
    : notification.className = 'warning';

  document.querySelector('body').append(notification);
}
