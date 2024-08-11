'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.body.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });

  document.body.addEventListener('click', () => {
    resolve();
  });
});

const promise3 = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.body.addEventListener('click', () => {
    if (rightClick) {
      resolve();
    }

    leftClick = true;
  });

  document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    if (leftClick) {
      resolve();
    }

    rightClick = true;
  });
});

const printMessage = (message, className) => {
  document.body.insertAdjacentHTML(
    'afterbegin',
    `
    <div data-qa="notification" class="${className}">
    ${message}
    </div>
    `,
  );
};

promise1
  .then(() => printMessage('First promise was resolved', 'success'))
  .catch(() => printMessage('First promise was rejected', 'error'));

promise2.then(() => printMessage('Second promise was resolved', 'success'));
promise3.then(() => printMessage('Third promise was resolved', 'success'));
