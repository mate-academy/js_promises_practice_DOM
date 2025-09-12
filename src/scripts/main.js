'use strict';

// firstPromise
const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('First promise was rejected')), 3000);

  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });
});

firstPromise
  .then((msg) => {
    const firstD1v = document.createElement('div');

    firstD1v.dataset.qa = 'notification';
    firstD1v.classList.add('success');
    firstD1v.textContent = msg;
    document.body.appendChild(firstD1v);
  })
  .catch((error) => {
    const firstD1vError = document.createElement('div');

    firstD1vError.dataset.qa = 'notification';
    firstD1vError.classList.add('error');
    firstD1vError.textContent = error.message;
    document.body.appendChild(firstD1vError);
  });

// secondPromise

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (key) => {
    if (key.button === 0 || key.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise.then((msg) => {
  const secondD1v = document.createElement('div');

  secondD1v.dataset.qa = 'notification';
  secondD1v.classList.add('success');
  secondD1v.textContent = msg;
  document.body.appendChild(secondD1v);
});

// thirdPromise

let leftClicked = false;
let rightClicked = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (key) => {
    if (key.button === 0) {
      leftClicked = true;
    }

    if (key.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((msg) => {
  const thirdD1v = document.createElement('div');

  thirdD1v.dataset.qa = 'notification';
  thirdD1v.classList.add('success');
  thirdD1v.textContent = msg;
  document.body.appendChild(thirdD1v);
});
