'use strict';

// Create 3 promises:
//   - The `firstPromise`
function createDiv(result, classType) {
  const div = document.createElement('div');

  div.classList.add(classType);
  div.dataset.qa = 'notification';
  div.textContent = result;
  document.body.append(div);
}

const promise1 = new Promise((resolve, reject) => {
  document.body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

promise1
  .then((result) => createDiv(result, 'success'))
  .catch((error) => createDiv(error, 'error'));

// - The `secondPromise`

const left = new Promise((resolve) => {
  document.body.addEventListener('click', () => {
    resolve('left');
  });
});

const right = new Promise((resolve) => {
  document.body.addEventListener('contextmenu', () => {
    resolve('right');
  });
});

Promise.any([left, right]).then((result) => {
  createDiv('Second promise was resolved', 'success');
});

// - The `thirdPromise`
Promise.all([left, right]).then((result) => {
  createDiv('Third promise was resolved', 'success');
});
