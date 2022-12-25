'use strict';

const page = document.documentElement;
const promise1 = new Promise((resolve, reject) => {
  page.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error()), 3000);
});

const promise2 = new Promise((resolve) => {
  page.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  page.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    switch (e.button) {
      case 0:
        leftClick = true;
        break;

      case 2:
        rightClick = true;
        break;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

function success(result) {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="success" data-qa="notification">
     ${result}
    </div>
  `);
}

function error() {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="warning" data-qa="notification">
      First promise was rejected
    </div>
  `);
}

promise1.then(success, error);
promise2.then(success);
promise3.then(success);
