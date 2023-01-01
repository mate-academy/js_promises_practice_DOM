'use strict';

const doc = document.querySelector('html');
const body = document.querySelector('body');
let count = 0;

function creatPromis() {
  const resolver = (success, warning) => {
    doc.addEventListener('click', () => {
      success();
      count++;
    });

    setTimeout(() => {
      warning();
    }, 3000);
  };

  return new Promise(resolver);
}

const firstPromise = creatPromis();

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

function creatPromis2() {
  const resolver = (success) => {
    doc.addEventListener('click', () => {
      success();
    });

    doc.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      success();
      count++;
    });
  };

  return new Promise(resolver);
}

const secondPromise = creatPromis2();

secondPromise
  .then(() => {
    body.insertAdjacentHTML('beforeend', `
      <div data-qa="notification" class="success">
        Second promise was resolved
      </div>
    `);
  });

function creatPromis3() {
  const resolver = (success) => {
    doc.addEventListener('click', () => {
      if (count === 2) {
        success();
      }
    });

    doc.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      if (count === 2) {
        success();
      }
    });
  };

  return new Promise(resolver);
}

const thirdPromise = creatPromis3();

thirdPromise
  .then(() => {
    body.insertAdjacentHTML('beforeend', `
      <div data-qa="notification" class="success">
        Third promise was resolved
      </div>
    `);
  });
