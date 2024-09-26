'use strict';

const body = document.querySelector('body');

let rightClick = false;
let leftClick = false;

const resolver1 = (resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject();
  }, 3000);
};

const resolver2 = (resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', () => {
    resolve();
  });
};

const resolver3 = (resolve) => {
  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve();
    }
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;

    if (leftClick && rightClick) {
      resolve();
    }
  });
};

const promise1 = new Promise(resolver1);
const promise2 = new Promise(resolver2);
const promise3 = new Promise(resolver3);

promise1
  .then(result => {
    body.insertAdjacentHTML('afterbegin', `
      <div class="success" data-qa="notification">
        First promise was resolved
      </div>
    `);
  })
  .catch(er => {
    body.insertAdjacentHTML('afterbegin', `
      <div class="error" data-qa="notification">
        First promise was rejected
      </div>
    `);
  });

promise2.then(result => {
  body.insertAdjacentHTML('afterbegin', `
    <div class="success" data-qa="notification">
      Second promise was resolved
    </div>
  `);
});

promise3.then(result => {
  body.insertAdjacentHTML('afterbegin', `
    <div class="success" data-qa="notification">
      Third promise was resolved
    </div>
  `);
});
