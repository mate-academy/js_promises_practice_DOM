'use strict';

const firstDiv = document.createElement('div');
const secondDiv = document.createElement('div');

firstDiv.setAttribute('data-qa', 'notification');
secondDiv.setAttribute('data-qa', 'notification');
document.querySelector('body').appendChild(firstDiv);
document.querySelector('body').appendChild(secondDiv);

const firstPromise = new Promise(function(resolve, reject) {
  document.addEventListener('click', () => {
    resolve('First promise was resolved!');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected!'));
  }, 3000);
});

const secondPromise = new Promise(function(resolve, reject) {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved!');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved!');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    document.addEventListener('contextmenu', () => {
      resolve('Third promise was resolved');
    });
  });

  document.addEventListener('contextmenu', () => {
    document.addEventListener('click', () => {
      resolve('Third promise was resolved');
    });
  });
});

function handleSuccess(promise) {
  if (promise === firstPromise) {
    promise.then(resolve => {
      firstDiv.classList.add('succes');
      firstDiv.textContent = resolve;
    });
  } else {
    promise.then(resolve => {
      secondDiv.classList.add('succes');
      secondDiv.textContent = resolve;
    });
  }
};

function handleReject(promise) {
  promise.catch(reject => {
    firstDiv.classList.add('warning');
    firstDiv.textContent = reject.message;
  });
};

handleSuccess(firstPromise);
handleReject(firstPromise);
handleSuccess(secondPromise);
handleSuccess(thirdPromise);
