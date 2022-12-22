'use strict';

const logo = document.querySelector('.logo');

const createFirstPromise = function() {
  return new Promise((resolve, reject) => {
    logo.addEventListener('click', () => {
      resolve();
    });

    setTimeout(() => {
      reject(error);
    }, 3000);
  });
};

function createleftClick() {
  return new Promise((resolve) => {
    logo.addEventListener('click', () => {
      resolve();
    });
  });
};

function createrightClick() {
  return new Promise((resolve) => {
    logo.addEventListener('contextmenu', (ev) => {
      ev.preventDefault();
      resolve();
    });
  });
};

const firstPromise = createFirstPromise();
let arrayWirhPromises;

firstPromise.then(() => {
  success('First promise was resolved');

  const leftClick = createleftClick();
  const rightClick = createrightClick();

  arrayWirhPromises = [leftClick, rightClick];

  return Promise.race(arrayWirhPromises);
}).then(() => {
  success('Second promise was resolved');

  return Promise.all(arrayWirhPromises);
}).then(() => {
  success('Third promise was resolved');
}).catch(error);

function success(message) {
  document.body.insertAdjacentHTML('beforeend', `
        <div data-qa="notification" class="success">
          ${message}
        </div>
    `);
}

function error() {
  document.body.insertAdjacentHTML('beforeend', `
        <div data-qa="notification" class="error">
          First promise was rejected
        </div>
    `);
}
