'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let click = false;

  document.addEventListener('click', () => {
    click = true;

    resolve('First promise was resolved');
  });

  setTimeout(() => {
    if (!click) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

firstPromise
  .then((res) => addNewElem(res, 'success'))
  .catch((er) => addNewElem(er, 'warning'));

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

secondPromise
  .then((res) => addNewElem(res, 'success'));

const thirdPromise = new Promise((resolve) => {
  let click = false;
  let contextmenu = false;

  document.addEventListener('click', () => {
    click = true;

    if (contextmenu) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    contextmenu = true;

    if (click) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then((res) => addNewElem(res, 'success'));

function addNewElem(message, classValue) {
  const elem = document.createElement('div');

  elem.setAttribute('data-qa', 'notification');
  elem.className = classValue;
  elem.innerText = message;

  return document.body.append(elem);
}
