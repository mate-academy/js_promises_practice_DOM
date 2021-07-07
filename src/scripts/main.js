'use strict';

function makeDivBlock(className, text) {
  const newDivBlock = document.createElement('div');

  newDivBlock.className = className;
  newDivBlock.innerHTML = text;
  newDivBlock.setAttribute('data-qa', 'notification');
  document.body.appendChild(newDivBlock);
}

let leftButton = 0;
let rightButton = 0;

new Promise((resolve, reject) => {
  document.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      leftButton = 1;
    }

    if (e.button === 2) {
      rightButton = 1;
    }

    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
})
  .then((value) => makeDivBlock('success', value))
  .catch((value) => makeDivBlock('warning', value));

new Promise((resolve, reject) => {
  document.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      leftButton = 1;
    }

    if (e.button === 2) {
      rightButton = 1;
    }

    if (e.button === 2 || e.button === 0) {
      resolve('Second promise was resolved');
    }
  });
}).then((value) => makeDivBlock('success', value));

new Promise((resolve, reject) => {
  document.addEventListener('mouseup', () => {
    if (leftButton > 0 && rightButton > 0) {
      resolve('Third promise was resolved');
    }
  });
}).then((value) => makeDivBlock('success', value));
