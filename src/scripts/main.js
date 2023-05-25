'use strict';

const firstProm = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondProm = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button !== 0 && e.button !== 2) {
      return;
    }
    resolve('Second promise was resolved');
  });
});

const thirdProm = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    } else if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

const handleSuccess = (message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');

  div.textContent = message;
  div.classList.add('success');

  document.body.append(div);
};

const handleError = (message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.textContent = message;
  div.classList.add('warning');

  document.body.append(div);
};

firstProm
  .then(handleSuccess)
  .catch(handleError);

secondProm
  .then(handleSuccess);

thirdProm
  .then(handleSuccess);
