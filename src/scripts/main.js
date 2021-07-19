'use strict';

function getCreateDiv(message, className) {
  document.body.insertAdjacentHTML('beforeend', `
<div 
class='${className}'
data-qa="notification">
${message}
</div>
`);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

firstPromise.then(() => getCreateDiv('First promise was resolved', 'success'))
  .catch(() => getCreateDiv('First promise was rejected', 'warning'));

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button !== 1) {
      resolve();
    }
  });
});

secondPromise
  .then(() => getCreateDiv('Second promise was resolved', 'success'));

const thirdPromise = new Promise((resolve, reject) => {
  let left = false;
  let right = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      left = true;
    };

    if (e.button === 2) {
      right = true;
    };

    if (left && right) {
      resolve();
    }
  });
});

thirdPromise
  .then(() => getCreateDiv('Third promise was resolved',
    'success success-third'));
