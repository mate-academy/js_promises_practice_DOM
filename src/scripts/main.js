'use strict';

let countRight = 0;
let countLeft = 0;

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', e => {
    resolve();
    countLeft++;
  });

  if (countLeft === 0) {
    setTimeout(() => reject(new Error()), 3000);
  }
});

const promise2 = new Promise((resolve) => {
  document.addEventListener('click', resolve);
  document.addEventListener('contextmenu', resolve);
});

const promise3 = new Promise((resolve) => {
  document.addEventListener('click', e => {
    countLeft = 0;
    countLeft++;

    if (countLeft === 1 && countRight === 1) {
      resolve();
    }
  });

  document.addEventListener('contextmenu', e => {
    countRight++;

    if (countLeft === 1 && countRight === 1) {
      resolve();
    }
  });
});

function createResponse(className, promiseNumber, result) {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="${className}">
      ${promiseNumber} promise was ${result}
    </div>
  `);
}

promise1
  .then(() => createResponse('success', 'First', 'resolved'))
  .catch(() => createResponse('warning', 'First', 'rejected'));

promise2
  .then(() => createResponse('success', 'Second', 'resolved'));

promise3
  .then(() => createResponse('success', 'Third', 'resolved'));
