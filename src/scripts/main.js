'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve(`First promise was resolved`);
  });

  setTimeout(() => {
    reject(new Error(`First promise was rejected`));
  }, 3000);
});

let counterLeftClick = 0;
let counterRightClick = 0;

const secondPromise = new Promise((resolve, reject) => {
  const resolvePromis = `Second promise was resolved`;

  document.addEventListener('click', () => {
    counterLeftClick++;
    resolve(resolvePromis);
  });

  document.addEventListener('contextmenu', () => {
    counterRightClick++;
    resolve(resolvePromis);
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  function clickСheck() {
    if (counterLeftClick > 0
    && counterRightClick > 0) {
      resolve(`Third promise was resolved`);
    }
  }

  document.addEventListener('click', () => clickСheck());
  document.addEventListener('contextmenu', () => clickСheck());
});

const body = document.querySelector('body');

function AddElemBody(elem) {
  body.insertAdjacentHTML('afterbegin', `
  <div data-qa="notification">${elem}</div>
  `);
}

firstPromise
  .then(data => {
    AddElemBody(data);
  })
  .catch(data => {
    AddElemBody(data);
  });

secondPromise
  .then(data => {
    AddElemBody(data);
  });

thirdPromise
  .then(data => {
    AddElemBody(data);
  });
