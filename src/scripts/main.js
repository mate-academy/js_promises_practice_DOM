'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected')); 
    // Error must be here because i have ESLint error
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let rightClick = false;
  let leftClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (rightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;

    if (leftClick) {
      resolve('Third promise was resolved');
    }
  });
});

const successHandler = (message) => {
  const msg = document.createElement('div');

  msg.setAttribute('data-qa', 'notification');
  msg.className = 'success';
  msg.textContent = message;
  document.body.append(msg);
};

const errorHandler = (error) => {
  const msg = document.createElement('div');

  msg.setAttribute('data-qa', 'notification');
  msg.className = 'error';
  msg.textContent = error && error.message ? error.message : error;
  document.body.append(msg);
};

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler).catch(errorHandler);
thirdPromise.then(successHandler).catch(errorHandler);
