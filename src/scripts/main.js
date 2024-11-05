'use strict';

let leftMousePressed = false;
let rightMousePressed = false;

const firstPromise = new Promise(function (resolve, reject) {
  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0) {
      resolve('First promise was resolved');
      leftMousePressed = true;
    }
  });

  setTimeout(() => {
    if (!leftMousePressed) {
      reject('First promise was rejected');
    }
  }, 3000);
});

firstPromise
  .then((mes) => createDiv(mes, 'success'))
  .catch((mes) => createDiv(mes, 'error'));

const secondPromise = new Promise(function (resolve, reject) {
  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0 || ev.button === 2) {
      resolve('Second promise was resolved');

      if (ev.button === 0) {
        leftMousePressed = true;
      }

      if (ev.button === 2) {
        rightMousePressed = true;
      }
    }
  });
});

secondPromise.then((mes) => createDiv(mes, 'success'));

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (ev) => {
    if (ev.button === 0) {
      leftMousePressed = true;
    }

    if (ev.button === 2) {
      rightMousePressed = true;
    }
    checkThirdPromise();
  });

  function checkThirdPromise() {
    if (leftMousePressed && rightMousePressed) {
      resolve('Third promise was resolved');
    }
  }
});

thirdPromise.then((mes) => createDiv(mes, 'success'));

function createDiv(message, type) {
  const element = document.createElement('div');

  element.classList.add(type);
  element.setAttribute('data-qa', 'notification');
  element.textContent = message;
  document.body.appendChild(element);
}
