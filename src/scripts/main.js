'use strict';

const body = document.querySelector('body');

const resolver1 = (resolv, reject) => {
  document.addEventListener('click', () => {
    resolv();
  });

  setTimeout(() => {
    reject();
  }, 3000);
};

const resolver2 = (resolv) => {
  document.addEventListener('click', () => {
    resolv();
  });

  document.addEventListener('contextmenu', () => {
    resolv();
  });
};

const promise1 = new Promise(resolver1);
const promise2 = new Promise(resolver2);
const promise3 = Promise.all([promise1, promise2]);

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
