'use strict';

const promisLC = new Promise(resolve => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const promisRC = new Promise(resolve => {
  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const firstPromise = new Promise((resolve, reject) => {
  promisLC.then(() => resolve('First promise was resolved'));
  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise(resolve => {
  Promise.race([promisLC, promisRC])
    .then(() => resolve('Second promise was resolved'));
});

const thirdPromise = new Promise(resolve => {
  Promise.all([promisLC, promisRC])
    .then((value) => resolve('Third promise was resolved'));
});

function showMassage(massage, type) {
  document.querySelector('body').insertAdjacentHTML('beforeend', `
    <div class="${type}" data-qa="notification">${massage}</div>
  `);
}

function showSuccessMassage(massage) {
  showMassage(massage, 'success');
}

function showWarningMassage(massage) {
  showMassage(massage, 'warning');
}

firstPromise
  .then(showSuccessMassage)
  .catch(showWarningMassage);
secondPromise.then(showSuccessMassage);
thirdPromise.then(showSuccessMassage);
