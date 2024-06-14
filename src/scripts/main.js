'use strict';

function createNotification(message, className) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = className;
  div.textContent = message;
  document.body.appendChild(div);
}

const successHandler = (text) => {
  createNotification(text, 'success');
};

const errorHandler = (error) => {
  createNotification(error.message, 'error');
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', (e) => {
    leftClick = true;

    if (rightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;

    if (leftClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler);
thirdPromise.then(successHandler);
