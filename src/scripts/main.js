'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error('Promise was rejected'));
  }, 3000);
});

firstPromise
  .then(() => {
    showMessage('First', 'success');
  })
  .catch(() => {
    showMessage('First', 'error');
  });

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

secondPromise
  .then(() => {
    showMessage('Second', 'success');
  })
  .catch(() => {
    showMessage('Second', 'error');
  });

const rightClick = new Promise((resolve, reject) => {
  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const leftClick = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const thirdPromise = Promise.all([rightClick, leftClick]);

thirdPromise
  .then(() => {
    showMessage('Third', 'success');
  })
  .catch(() => {
    showMessage('Third', 'error');
  });

function showMessage(promise, statusType) {
  const message = document.createElement('div');

  if (statusType === 'success') {
    message.textContent = `${promise} promise was resolved`;
  } else {
    message.textContent = `${promise} promise was rejected`;
  }

  message.setAttribute('data-qa', `notification`);
  message.classList.add(`${statusType}`);

  document.body.appendChild(message);
}
