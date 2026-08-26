'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let click = false;
  let menu = false;

  document.addEventListener('click', () => {
    click = true;

    if (click && menu) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    menu = true;

    if (click && menu) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((message) => createDiv(message, true))
  .catch((error) => createDiv(error.message, false));

secondPromise
  .then((message) => createDiv(message, true))
  .catch((message) => createDiv(message, false));

thirdPromise
  .then((message) => createDiv(message, true))
  .catch((message) => createDiv(message, false));

function createDiv(message, isSuccessfull) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.textContent = message;

  if (isSuccessfull) {
    div.classList.add('success');
  } else {
    div.classList.add('error');
  }

  document.body.append(div);
}
