'use strict';

// write your code here

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

promise1
  .then(() => {
    const message = document.createElement('div');

    message.dataset.qa = 'notification';
    message.classList.add('success');
    message.innerText = 'First promise was resolved';
    document.body.append(message);
  })
  .catch(() => {
    const message = document.createElement('div');

    message.dataset.qa = 'notification';
    message.classList.add('warning');
    message.innerText = 'First promise was rejected';
    document.body.append(message);
  });

const promise2 = new Promise((resolve) => {
  document.addEventListener('mousedown', (clickEvent) => {
    if (clickEvent.button === 1) {
      return;
    }
    resolve();
  });
});

promise2
  .then(() => {
    const message = document.createElement('div');

    message.dataset.qa = 'notification';
    message.classList.add('success');
    message.innerText = 'Second promise was resolved';
    document.body.append(message);
  });

const promise3 = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (clickEvent) => {
    if (clickEvent.button === 0) {
      leftClick = true;
    }

    if (clickEvent.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve();
    }
  });
});

promise3
  .then(() => {
    const message = document.createElement('div');

    message.dataset.qa = `notification`;
    message.classList.add('success');
    message.innerText = 'Third promise was resolved';
    document.body.append(message);
  });
