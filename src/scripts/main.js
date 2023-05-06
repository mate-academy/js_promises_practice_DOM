'use strict';

function createNotification(promiseName, className, condition) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = `${className}`;
  div.textContent = `${promiseName} promise was ${condition}`;
  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  const timeOut = setTimeout((error) => {
    reject(error);
  }, 3000);

  document.addEventListener('click', () => {
    clearTimeout(timeOut);
    resolve();
  });
});

firstPromise
  .then(() => {
    createNotification('First', 'success', 'resolved');
  })
  .catch(() => {
    createNotification('First', 'warning', 'rejected');
  });

const secondPromise = new Promise((resolve) => {
  ['click', 'contextmenu'].forEach(e => {
    document.addEventListener(e, () => {
      resolve();
    });
  });
});

secondPromise
  .then(() => {
    createNotification('Second', 'success', 'resolved');
  });

const leftClick = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const rightClick = new Promise((resolve) => {
  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  Promise.all([leftClick, rightClick]).then(() => {
    resolve();
  });
});

thirdPromise
  .then(() => {
    createNotification('Third', 'success', 'resolved');
  });
