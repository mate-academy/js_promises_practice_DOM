'use strict';

const root = document.body;
const successText1 = `First promise was resolved`;
const errorText1 = `First promise was rejected`;
const successText2 = `Second promise was resolved`;
const successText3 = `Third promise was resolved`;
const successClassName = `success`;
const errorClassName = `warning`;

const firstPromise = new Promise((resolve, reject) => {
  root.addEventListener('click', () => {
    resolve(successText1);
  });

  setTimeout(() => reject(new Error(errorText1)), 3000);
});

const secondPromise = new Promise((resolve) => {
  root.addEventListener('mouseup', () => {
    if (event.button !== 1) {
      resolve(successText2);
    }
  });
});

const thirdPromise = waitFor('click');
const forthPromise = waitFor('contextmenu');

firstPromise
  .then((result) => message(result, successClassName))
  .catch((error) => message(error, errorClassName));

secondPromise.then((result) => message(result, successClassName));

thirdPromise
  .then(() => forthPromise)
  .then((result) => message(result, successClassName));

function waitFor(eventType) {
  return new Promise((resolve) => {
    root.addEventListener(eventType, () => {
      resolve(successText3);
    });
  });
}

function message(text, className) {
  root.insertAdjacentHTML('beforeend', `
  <div class="${className}" data-qa="notification">${text}</div>
`);
}
