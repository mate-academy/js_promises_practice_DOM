'use strict';

const doc = document.documentElement;
const body = document.body;

const createDiv = (classType, value) => {
  body.insertAdjacentHTML('beforeend', `
      <div data-qa="notification" class="${classType}">
        ${value}
      </div>
    `);
};

const firstPromise = new Promise((resolve, reject) => {
  doc.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  doc.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  doc.addEventListener('contextmenu', (mouseEvent) => {
    mouseEvent.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  doc.addEventListener('mousedown', (mouseEvent) => {
    if (mouseEvent.button === 0) {
      leftClick = true;
    } else if (mouseEvent.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(result => createDiv('success1', result))
  .catch(error => createDiv('error', error));

secondPromise
  .then(result => createDiv('success2', result));

thirdPromise
  .then(result => createDiv('success3', result));
