'use strict';

const body = document.querySelector('body');
let left = false;
let right = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });

  document.addEventListener('click', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise(resolve => {
  document.addEventListener('mouseup', (e) => {
    switch (e.button) {
      case 0:
        left = true;
        break;
      case 2:
        right = true;
        break;
    }

    if (left && right) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(result =>
    body.insertAdjacentHTML('beforeend', `
      <div data-qa="notification" class="success">${result}</div>
    `)
  )
  .catch(error =>
    body.insertAdjacentHTML('beforeend', `
      <div data-qa="notification" class="warning ">${error}</div>
    `)
  );

secondPromise
  .then(result =>
    body.insertAdjacentHTML('beforeend', `
      <div data-qa="notification" class="success">${result}</div>
    `)
  );

thirdPromise
  .then(result =>
    body.insertAdjacentHTML('beforeend', `
      <div data-qa="notification" class="success">${result}</div>
    `));
