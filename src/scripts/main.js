'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    };
  });

  setTimeout(() => {
    const message = 'First promise was rejected';

    reject(message);
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const promise3 = new Promise((resolve) => {
  document.addEventListener('mousedown', (e1) => {
    document.addEventListener('mousedown', (e2) => {
      if ((e1.button === 0 && e2.button === 2)
        || (e1.button === 2 && e2.button === 0)) {
        resolve('Third promise was resolved');
      }
    });
  });
});

const successHandler = (result) => {
  createDiv('success', result);
};

const errorHandler = (error) => {
  createDiv('warning', error);
};

function createDiv(className, data) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(className);
  div.innerHTML = data;
  document.body.append(div);
}

promise1
  .then(successHandler, errorHandler);

promise2
  .then(successHandler);

promise3
  .then(successHandler);
