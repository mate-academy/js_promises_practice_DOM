'use strict';

const taskBlock = document.createElement('div');

taskBlock.setAttribute('data-qa = "notification"');
document.body.appendChild(taskBlock);

const firstPromise = new Promise(function(resolve, reject) {
  taskBlock.addEventListener('click', () => {
    resolve('success');
  });

  setTimeout(() => {
    reject(new Error('error'));
  }, 3000);
});

const secondPromise = new Promise(function(resolve, reject) {
  taskBlock.addEventListener('left' || 'right', () => {
    resolve('success');
  });
});

const thirdPromise = new Promise(function(resolve, reject) {
  taskBlock.addEventListener('left' && 'right', () => {
    resolve('success');
  });
});

firstPromise.then(() => {
  document.body.insertAdjacentHTML('beforeend',
    '<div>First promise was resolved</div>');
});

firstPromise.catch(() => {
  document.body.insertAdjacentHTML('beforeend',
    '<div>First promise was rejected</div>');
});

secondPromise.then(() => {
  document.body.insertAdjacentHTML('beforeend',
    '<div>Second promise was resolved</div>');
});

thirdPromise.then(() => {
  document.body.insertAdjacentHTML('beforeend',
    '<div>Third promise was resolved</div>');
});
