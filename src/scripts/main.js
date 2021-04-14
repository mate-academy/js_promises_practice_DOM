'use strict';

const container = document.createElement('div');

container.className = 'container';
document.body.append(container);

const appendMessage = (className, message) => {
  container.insertAdjacentHTML('beforeend', `
  <div data-qa="notification" class="${className}">${message}</div>
  `);
};

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('Promise was rejected!'));
  }, 3000);

  document.addEventListener('mousedown', () => {
    resolve();
  });
});

const promise2 = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button !== 1) {
      resolve();
    }
  });
});

const promise3 = new Promise((resolve) => {
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
});

promise1
  .then(() => {
    appendMessage('success', 'First promise was resolved');
  })
  .catch(() => {
    appendMessage('warning', 'First promise was rejected');
  });

promise2.then(() => {
  appendMessage('success', 'Second promise was resolved');
});

promise3.then(() => {
  appendMessage('success', 'Third promise was resolved');
});
