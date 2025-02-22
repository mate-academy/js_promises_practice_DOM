'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', () => {
    resolve('First');
  });

  setTimeout(() => {
    reject(new Error('First'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.body.addEventListener('mousedown', (e) => {
    resolve('Second');
  });
});

const thirdPromise = new Promise((resolve) => {
  const clickState = {
    left: false,
    right: false,
  };

  document.body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      clickState.left = true;
    }

    if (e.button === 2) {
      clickState.right = true;
    }

    if (clickState.left && clickState.right) {
      resolve('Third');
    }
  });
});

const successHandle = (text) => {
  const messageBody = document.createElement('div');

  messageBody.classList.add('success');
  messageBody.setAttribute('data-qa', 'notification');
  messageBody.textContent = `${text} promise was resolved`;
  document.body.append(messageBody);
};

const erroeHandle = (error) => {
  const errorBody = document.createElement('div');

  errorBody.classList.add('error');
  errorBody.setAttribute('data-qa', 'notification');
  errorBody.textContent = `${error.message} promise was rejected`;
  document.body.append(errorBody);
};

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

firstPromise.then(successHandle).catch(erroeHandle);
secondPromise.then(successHandle);
thirdPromise.then(successHandle);
