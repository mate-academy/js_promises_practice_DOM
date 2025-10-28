'use strict';

function handler(result, stat) {
  const div = document.createElement('div');

  div.className = stat;
  div.dataset.qa = 'notification';
  div.textContent = result;

  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  const tid = setTimeout(() => {
    reject(new Error('First promise was rejected'));
    clearTimeout(tid);
  }, 3000);

  const handleClick = (e) => {
    resolve(`First promise was resolved`);

    document.removeEventListener('click', handleClick);
    clearTimeout(tid);
  };

  document.addEventListener('click', handleClick);
});

const secondPromise = new Promise((resolve, reject) => {
  const handleMousedown = (e) => {
    if (e.button === 2 || e.button === 0) {
      resolve(`Second promise was resolved`);

      document.removeEventListener('mousedown', handleMousedown);
    }
  };

  document.addEventListener('mousedown', handleMousedown);
});

let leftClick = 0;
let rightClick = 0;

const thirdPromise = new Promise((resolve, reject) => {
  const handleMousedown = (e) => {
    if (e.button === 0) {
      leftClick = 1;
    }

    if (e.button === 2) {
      rightClick = 1;
    }

    if (leftClick && rightClick) {
      resolve(`Third promise was resolved`);

      document.removeEventListener('mousedown', handleMousedown);
    }
  };

  document.addEventListener('mousedown', handleMousedown);
});

firstPromise
  .then((result) => {
    handler(result, 'success');
  })
  .catch((error) => {
    handler(error.message, 'error');
  });

secondPromise
  .then((result) => {
    handler(result, 'success');
  })
  .catch((error) => {
    handler(error.message, 'error');
  });

thirdPromise
  .then((result) => {
    handler(result, 'success');
  })
  .catch((error) => {
    handler(error.message, 'error');
  });
