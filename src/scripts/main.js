'use strict';

const leftClickPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const rightClickPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
});

const firstPromise = new Promise((resolve, reject) => {
  leftClickPromise.then(() => resolve('First promise was resolved'));

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  Promise.race([leftClickPromise, rightClickPromise])
    .then(() => resolve('Second promise was resolved'));
});

const thirdPromise = new Promise((resolve) => {
  Promise.all([leftClickPromise, rightClickPromise])
    .then(() => resolve('Third promise was resolved'));
});

firstPromise
  .then(showSuccessMessage)
  .catch(showWarningMessage);

secondPromise.then(showSuccessMessage);

thirdPromise.then(showSuccessMessage);

function showSuccessMessage(message) {
  createMessage('success', message);
};

function showWarningMessage(message) {
  createMessage('warning', message);
};

function createMessage(type, description) {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="${type}">
      ${description}
    </div>
    `);
}
