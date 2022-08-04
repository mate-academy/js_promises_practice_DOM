'use strict';

const body = document.querySelector('body');

const promise1 = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve(`First promise was resolved`);
  });

  setTimeout(() => {
    reject(new Error(`First promise was rejected`));
  }, 3000);
});

promise1
  .then(result => {
    body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class = "success">${result}</div>
    `);
  })
  .catch(error => {
    body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class = "warning">${error}</div>
    `);
  });

const promise2 = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve(`Second promise was resolved`);
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve(`Second promise was resolved`);
  });
});

promise2
  .then(result => {
    body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class = "success">${result}</div>
    `);
  })
  .catch();

const promise3 = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    body.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      resolve(`Third promise was resolved`);
    });
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    body.addEventListener('click', () => {
      resolve(`Third promise was resolved`);
    });
  });
});

promise3
  .then(result => {
    body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class = "success">${result}</div>
    `);
  })
  .catch();
