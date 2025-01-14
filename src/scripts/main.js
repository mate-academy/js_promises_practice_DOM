'use strict';

const promise1 = new Promise((resolve, reject) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      document.removeEventListener('mousedown', handleClick);
    }
  };

  document.addEventListener('mousedown', handleClick);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('mousedown', handleClick);
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', handleClick);
    }
  };

  document.addEventListener('mousedown', handleClick);
});

const promise3 = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 1) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', handleClick);
    }
  };

  document.addEventListener('mousedown', handleClick);
});

const successHandler = (message) => {
  const messageBlock = document.createElement('div');

  messageBlock.className = 'success';
  messageBlock.dataset.qa = 'notification';
  messageBlock.innerText = message;
  document.body.appendChild(messageBlock);
};

const errorHandler = (data) => {
  const messageBlock = document.createElement('div');

  messageBlock.className = 'error';
  messageBlock.dataset.qa = 'notification';
  messageBlock.innerText = data.message;
  document.body.appendChild(messageBlock);
};

promise1.then(successHandler).catch(errorHandler);
promise2.then(successHandler).catch(errorHandler);
promise3.then(successHandler).catch(errorHandler);
