'use strict';

const body = document.querySelector('body');

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  document.addEventListener('mouseup', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const promise3 = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  });
});

promise1.then(result => {
  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="success">${result}</div>
  `);
})
  .catch(result => {
    body.insertAdjacentHTML('beforeend', `
      <div data-qa="notification" class="warning ">${result}</div>
    `);
  });

promise2.then(result => {
  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="success">${result}</div>
  `);
});

promise3.then(result => {
  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="success">${result}</div>
  `);
});
