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
  document.addEventListener('mousedown', (evnt) => {
    if (evnt.button === 0 || evnt.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (evnt) => {
    if (evnt.button === 0) {
      leftClick = true;
    }

    if (evnt.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

function createMesage(mesage, type) {
  const div = document.createElement('div');

  div.classList = type;
  div.dataset.qa = 'notification';
  div.innerText = mesage;
  document.body.append(div);
}

firstPromise
  .then((result) => createMesage(result, 'success'))
  .catch((result) => createMesage(result, 'error'));

secondPromise.then((result) => createMesage(result, 'success'));

thirdPromise.then((result) => createMesage(result, 'success'));

