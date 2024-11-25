'use strict';

const body = document.querySelector('body');
const fall = ['error', 'First promise was rejected'];

function getMessage(result) {
  body.insertAdjacentHTML('afterbegin', `
  <div data-qa="notification" class="${result[0]}">
  ${result[1]}
  </div>
  `);
}

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve(['success', 'First promise was resolved']);
  });

  setTimeout(() => {
    reject(fall);
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  body.addEventListener('mouseup', () => {
    resolve(['success', 'Second promise was resolved']);
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let countLeft = false;
  let countRight = false;

  document.addEventListener('mousedown', e => {
    switch (e.button) {
      case 0:
        countLeft = true;
        break;
      case 2:
        countRight = true;
        break;
    }

    if (countLeft & countRight) {
      resolve(['success', 'Third promise was resolved']);
    }
  });
});

firstPromise
  .then(getMessage)
  .catch(getMessage);

secondPromise
  .then(getMessage);

thirdPromise
  .then(getMessage);
