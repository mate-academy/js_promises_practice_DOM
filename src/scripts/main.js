'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  // eslint-disable-next-line prefer-promise-reject-errors
  setTimeout(() => reject('First promise was rejected'), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.body.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.body.addEventListener('contextmenu', () => {
    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.body.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((data) => {
    addDiv('success', data);
  })
  .catch((data) => {
    addDiv('error', data);
  });

secondPromise.then((data) => {
  addDiv('success', data);
});

thirdPromise.then((data) => {
  addDiv('success', data);
});

function addDiv(className, data) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(className);
  div.textContent = data;
  document.body.append(div);
}
