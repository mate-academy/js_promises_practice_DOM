'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => resolve());

  setTimeout(() => reject(new Error('Promise was rejected!')), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => resolve());
  document.addEventListener('contextmenu', () => resolve());
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (rightClick) {
      resolve();
    }
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;

    if (leftClick) {
      resolve();
    }
  });
});

const showMessage = (count, success = true) => {
  const message = document.createElement('div');

  message.classList.add(success ? 'success' : 'warning');

  message.textContent = `${count} promise was
  ${success
    ? 'resolved'
    : 'rejected'
}`;
  message.dataset.qa = 'notification';
  document.body.appendChild(message);
};

firstPromise.then(() => showMessage('First'));
firstPromise.catch(() => showMessage('First', false));

secondPromise.then(() => showMessage('Second'));

thirdPromise.then(() => showMessage('Third'));
