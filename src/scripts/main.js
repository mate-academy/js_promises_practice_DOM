'use strict';

const body = document.querySelector('body');

const createNotification = (message, type) => {
  const div = document.createElement('div');

  div.classList.add('notification', type);
  div.innerText = message;
  div.dataset.qa = 'notification';

  body.append(div);
};

const promise1 = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => reject(Error), 3000);
});

promise1
  .then(createNotification('First promise was resolved', 'success'))
  .catch(createNotification('First promise was rejected', 'warning'));

const promise2 = new Promise((resolve) => {
  body.addEventListener('click', () => {
    resolve();
  });

  body.addEventListener('contextmenu', () => {
    resolve();
  });
});

promise2
  .then(createNotification('Second promise was resolved', 'success'));

const promise3 = new Promise((resolve) => {
  let left = 0;
  let right = 0;

  body.addEventListener('mousedown', (e) => {
    left += e.button === 0 ? 1 : 0;
    right += e.button === 2 ? 1 : 0;

    if (left >= 1 && right >= 1) {
      resolve();
    }
  });
});

promise3
  .then(createNotification('Third promise was resolved', 'success'));
