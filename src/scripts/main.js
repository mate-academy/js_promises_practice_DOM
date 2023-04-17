'use strict';

const doc = document.querySelector('body');

function showSuccses(value) {
  doc.insertAdjacentHTML('beforeend', `
    <div class=success data-qa="notification">${value}</div>
    `);
};

function showError(value) {
  doc.insertAdjacentHTML('beforeend', `
    <div class=error data-qa="notification">${value.toString().slice(6)}</div>
    `);
}

const firstPromise = new Promise((resolve, reject) => {
  doc.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve(`First promise was resolved`);
    } else {
      return false;
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  doc.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve(`Second promise was resolved`);
    } else {
      return false;
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let rigthClick = false;
  let leftClick = false;

  doc.addEventListener('mousedown', (e) => {
    if (e.button === 2) {
      rigthClick = true;
    }

    if (e.button === 0) {
      leftClick = true;
    }

    if (rigthClick && leftClick) {
      resolve(`Third promise was resolved`);
    }
  });
});

firstPromise
  .then(showSuccses, showError);

secondPromise
  .then(showSuccses);

thirdPromise
  .then(showSuccses);
