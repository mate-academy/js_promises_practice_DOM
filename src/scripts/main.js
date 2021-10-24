'use strict';

const body = document.querySelector('body');
const fall = ['error', 'First promise was rejected'];
let countLeft = 0;
let countRight = 0;

function getMessage(result) {
  body.insertAdjacentHTML('afterbegin', `
  <div data-qa="notification" class="${result[0]}">
  ${result[1]}
  </div>
  `);
}

body.addEventListener('contextmenu', (e) => {
  countRight = 1;
});

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    countLeft = 1;
    resolve(['success', 'First promise was resolved']);
  });

  setTimeout(() => {
    if (countLeft === 0) {
      reject(fall);
    }
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  body.addEventListener('mouseup', () => {
    resolve(['success', 'Second promise was resolved']);
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  body.addEventListener('mouseup', (e) => {
    const key = e.button;

    if ((key === 0 & countRight === 1) || (key === 2 & countLeft === 1)) {
      resolve(['success', 'Third promise was resolved']);
    };
  });
});

firstPromise
  .then(getMessage)
  .catch(getMessage);

secondPromise
  .then(getMessage);

thirdPromise
  .then(getMessage);
