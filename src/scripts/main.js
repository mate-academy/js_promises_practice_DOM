'use strict';

const doc = document.querySelector('html');
const body = document.querySelector('body');
let leftClick;
let rightClick;

function creatPromise() {
  const resolver = (resolve, reject) => {
    doc.addEventListener('click', () => {
      resolve();
      leftClick = 1;
    });

    setTimeout(() => {
      reject();
    }, 3000);
  };

  return new Promise(resolver);
}

const firstPromise = creatPromise();

firstPromise
  .then(() => {
    body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="success">First promise was resolved</div>
    `);
  })
  .catch(() => {
    body.insertAdjacentHTML('beforeend', `
      <div data-qa="notification" class="warning">
        First promise was rejected
      </div>
    `);
  });

function creatPromise2() {
  const resolver = (resolve) => {
    doc.addEventListener('click', () => {
      resolve();
    });

    doc.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      resolve();
      rightClick = 1;
    });
  };

  return new Promise(resolver);
}

const secondPromise = creatPromise2();

secondPromise
  .then(() => {
    body.insertAdjacentHTML('beforeend', `
      <div data-qa="notification" class="success">
        Second promise was resolved
      </div>
    `);
  });

function creatPromise3() {
  const resolver = (resolve) => {
    doc.addEventListener('click', () => {
      if (leftClick && rightClick) {
        resolve();
      }
    });

    doc.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      if (leftClick && rightClick) {
        resolve();
      }
    });
  };

  return new Promise(resolver);
}

const thirdPromise = creatPromise3();

thirdPromise
  .then(() => {
    body.insertAdjacentHTML('beforeend', `
      <div data-qa="notification" class="success">
        Third promise was resolved
      </div>
    `);
  });
