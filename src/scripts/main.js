'use strict';

const body = document.querySelector('body');
const div = document.createElement('div');

function addElement() {
  body.append(div);
  div.dataset.qa = 'notification';
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
    addElement();
    div.classList.add('success');
    div.textContent = 'First promise was resolved';
  })
  .catch(() => {
    addElement();
    div.classList.add('warning');
    div.textContent = 'First promise was rejected';
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
    addElement();
    div.classList.add('success');
    div.textContent = 'Second promise was resolved';
  });

function thirdPromise(value) {
  return new Promise(resolve => {
    body.addEventListener('mousedown', (e) => {
      if (e.which === value) {
        resolve();
      }
    });
  });
}

const thirdPromiseLeft = thirdPromise(1);
const thirdPromiseRight = thirdPromise(3);

thirdPromiseLeft
  .then(() => {
    return thirdPromiseRight;
  })
  .then(() => {
    addElement();
    div.classList.add('success');
    div.textContent = 'Third promise was resolved';
  });
