'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const promise2 = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve) => {
  let leftButtonClick = false;
  let rightButtonClick = false;

  document.addEventListener('click', (e) => {
    leftButtonClick = true;

    if (leftButtonClick && rightButtonClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    rightButtonClick = true;

    if (leftButtonClick && rightButtonClick) {
      resolve('Third promise was resolved');
    }
  });
});

const handleSuccess = (resolve) => {
  const message = document.createElement('div');

  message.classList.add('success');
  message.textContent = resolve;
  message.setAttribute('data-qa', 'notification');
  document.body.appendChild(message);
};

const handleError = (error) => {
  const message = document.createElement('div');

  message.textContent = error;
  message.classList.add('error');
  message.setAttribute('data-qa', 'notification');
  document.body.appendChild(message);
};

promise1.then(handleSuccess).catch(handleError);
promise2.then(handleSuccess);
promise3.then(handleSuccess);
