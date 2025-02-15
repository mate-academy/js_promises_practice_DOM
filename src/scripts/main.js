'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      clearTimeout(timer);
      resolve('First promise was resolved');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
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

const successHandler = (message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.textContent = message;
  document.body.appendChild(div);
};

const errorHandler = (error) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  div.textContent = error;
  document.body.appendChild(div);
};

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler);
thirdPromise.then(successHandler);
