'use strict';

const createNotification = (message, isSuccess) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(isSuccess ? 'success' : 'error');
  div.textContent = `${message} promise was ${isSuccess ? 'resolved' : 'rejected'}`;
  document.body.appendChild(div);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });
  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve();

      if (e.button === 2) {
        e.preventDefault();
      }
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  const handleLeftClick = (e) => {
    if (e.button === 0) {
      leftClicked = true;
      document.removeEventListener('mousedown', handleLeftClick);

      if (rightClicked) {
        resolve();
      }
    }
  };

  const handleRightClick = (e) => {
    if (e.button === 2) {
      rightClicked = true;
      e.preventDefault();
      document.removeEventListener('mousedown', handleRightClick);

      if (leftClicked) {
        resolve();
      }
    }
  };

  document.addEventListener('mousedown', handleLeftClick);
  document.addEventListener('mousedown', handleRightClick);
});

firstPromise
  .then(() => createNotification('First', true))
  .catch(() => createNotification('First', false));

secondPromise
  .then(() => createNotification('Second', true))
  .catch(() => createNotification('Second', false));

thirdPromise
  .then(() => createNotification('Third', true))
  .catch(() => createNotification('Third', false));
