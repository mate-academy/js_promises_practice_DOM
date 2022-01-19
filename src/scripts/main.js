'use strict';

const body = document.body;

function createDivResolved(massage) {
  body.insertAdjacentHTML('beforeend', `
  <div
    data-qa="notification"
    class="success"
  >${massage}</div>
  `);
};

function createDivReject(massage) {
  body.insertAdjacentHTML('afterbegin', `
  <div
    data-qa="notification"
    class="warning"
  >${massage}</div>
  `);
};

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});

firstPromise.then(createDivResolved, createDivReject);

const secondPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

secondPromise.then(createDivResolved);

const thirdPromise = Promise.all([
  new Promise((resolve) => {
    body.addEventListener('click', () => {
      resolve();
    });
  }),

  new Promise((resolve) => {
    body.addEventListener('contextmenu', () => {
      resolve();
    });
  }),
]).then(() => 'Third promise was resolved');

thirdPromise.then(createDivResolved);
