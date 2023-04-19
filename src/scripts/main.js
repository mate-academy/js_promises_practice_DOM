'use strict';

const showMessage = (message, className) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(className);
  div.textContent = message;
  document.body.append(div);
};

const clickPromise = new Promise(resolve => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const contextMenuPromise = new Promise(resolve => {
  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const firstPromise = new Promise((resolve, reject) => {
  clickPromise
    .then(() => resolve('First promise was resolved'));

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then(res => showMessage(res, 'success'))
  .catch(res => showMessage(res, 'warning'));

const secondPromise = new Promise((resolve, reject) => {
  Promise.race([clickPromise, contextMenuPromise])
    .then(() => resolve('Second promise was resolved'));
});

secondPromise
  .then(res => showMessage(res, 'success'))
  .catch(res => alert(res));

const thirdPromise = new Promise(resolve => {
  Promise.all([clickPromise, contextMenuPromise])
    .then((value) => resolve('Third promise was resolved'));
});

thirdPromise
  .then(res => showMessage(res, 'success'))
  .catch(res => alert(res));
