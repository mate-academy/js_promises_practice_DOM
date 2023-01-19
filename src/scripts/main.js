'use strict';

const textResolved1 = 'First promise was resolved';
const textRejected1 = 'First promise was rejected';
const textResolved2 = 'Second promise was resolved';
const textResolved3 = 'Third promise was resolved';

function createDiv(type, message) {
  const div = document.createElement('div');

  div.className = type;
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;
  document.body.append(div);
};

function createPromise2() {
  const resolver = (resolve) => {
    document.addEventListener('mouseup', (e) => {
      if (e.button === 0 || e.button === 2) {
        resolve(textResolved2);
      }
    });
  };

  return new Promise(resolver);
}

function createPromise1() {
  const resolver = (resolve, reject) => {
    document.addEventListener('mouseup', (e) => {
      if (e.button === 0) {
        resolve(textResolved1);
      }
    });

    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        reject(textRejected1);
      }, 3000);
    });
  };

  return new Promise(resolver);
}

function waitForClick(action) {
  return new Promise((resolve) => {
    document.addEventListener(action, () => {
      resolve();
    });
  });
}

const leftClick = waitForClick('click');
const rightClick = waitForClick('contextmenu');
const promise1 = createPromise1();
const promise2 = createPromise2();
const promise3 = Promise.all([leftClick, rightClick]);

promise1
  .then((result) => {
    createDiv('success', result);
  })
  .catch((error) => {
    createDiv('warning', error);
  });

promise2
  .then((result) => {
    createDiv('success', result);
  });

promise3
  .then(() => {
    createDiv('success', textResolved3);
  });
