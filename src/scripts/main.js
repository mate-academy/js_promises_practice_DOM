'use strict';

const body = document.querySelector('body');
const div = document.createElement('div');

function addElement(classDIV, messageDIV) {
  body.append(div);
  div.dataset.qa = 'notification';
  div.classList.add(classDIV);
  div.textContent = messageDIV;
}

function firstPromise() {
  const resolver1 = (complete, error) => {
    setTimeout(() => {
      error();
    }, 3000);

    body.addEventListener('mousedown', (e) => {
      if (e.which === 1) {
        complete();
      }
    });
  };

  return new Promise(resolver1);
}

const first = firstPromise();

first
  .then(() => {
    addElement('success', 'First promise was resolved');
  })
  .catch(() => {
    addElement('warning', 'First promise was rejected');
  });

function secondPromise() {
  const resolver2 = (complete) => {
    body.addEventListener('mousedown', (e) => {
      if (e.which === 1 || e.which === 3) {
        complete();
      }
    });
  };

  return new Promise(resolver2);
}

const second = secondPromise();

second
  .then(() => {
    addElement('success', 'Second promise was resolved');
  });

function thirdPromise() {
  let leftButton = false;
  let rightButton = false;

  return new Promise(resolve => {
    body.addEventListener('mousedown', (e) => {
      if (e.which === 1) {
        leftButton = true;
      }

      if (e.which === 3) {
        rightButton = true;
      }

      if (leftButton && rightButton) {
        resolve();
      }
    });
  });
}

const thirdPromiseLR = thirdPromise();

thirdPromiseLR
  .then(() => {
    addElement('success', 'Third promise was resolved');
  });
