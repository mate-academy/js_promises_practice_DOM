'use strict';

const body = document.querySelector('body');

const notification = (message, type) => {
  const div = document.createElement('div');

  div.classList.add('notification', type);
  div.innerText = message;
  div.dataset.qa = 'notification';

  body.append(div);
};

const messageS1 = () => {
  notification('First promise was resolved', 'success');
};

const messageS2 = () => {
  notification('Second promise was resolved', 'success');
};

const messageS3 = () => {
  notification('Third promise was resolved', 'success');
};

const messageE1 = () => {
  notification('First promise was rejected', 'warning');
};

const promise1 = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => reject(messageE1), 3000);
});

promise1
  .then(messageS1)
  .catch(messageE1);

const promise2 = new Promise((resolve) => {
  body.addEventListener('click', () => {
    resolve();
  });

  body.addEventListener('contextmenu', () => {
    resolve();
  });
});

promise2
  .then(messageS2);

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
  .then(messageS3);
