'use strict';

let counter = 0;
const promiseOne = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (!counter) {
      reject(showHandler('error', 'First promise was rejected'));
    }
  }, 3000);

  document.addEventListener('click', function () {
    resolve(showHandler('success', 'First promise was resolved'));
    counter++;
  });
});
const promiseTwo = new Promise((resolve, reject) => {
  document.addEventListener('click', function () {
    resolve(showHandler('success', 'Second promise was resolved'));
  });
  document.addEventListener('contextmenu', function () {
    resolve(showHandler('success', 'Second promise was resolved'));
  });
});
let leftClick = 0;
let rightClick = 0;
const promiseThree = new Promise((resolve, reject) => {
  document.addEventListener('contextmenu', function () {
    rightClick++;

    if (leftClick && rightClick) {
      resolve(showHandler('success', 'Third promise was resolved'));
    }
  });

  document.addEventListener('click', function () {
    leftClick++;

    if (leftClick && rightClick) {
      resolve(showHandler('success', 'Third promise was resolved'));
    }
  });
});

function showHandler(res, message) {
  const div = document.createElement('div');
  const body = document.querySelector('body');

  div.setAttribute('data-qa', 'notification');
  div.className = res;
  div.innerText = message;
  body.appendChild(div);
}
