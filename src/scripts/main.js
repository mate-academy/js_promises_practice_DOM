'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(result => {
    createDiv(result, 'success');
  })
  .catch(error => {
    createDiv(error, 'warning');
  });

secondPromise
  .then(resolve => {
    createDiv(resolve, 'success');
  });

thirdPromise
  .then(result => {
    createDiv(result, 'success');
  });

function createDiv(text, result) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(result);
  div.innerText = text;
  document.body.append(div);
}
