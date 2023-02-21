'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let click = false;

  document.addEventListener('click', () => {
    click = true;

    resolve();
  });

  setTimeout(() => {
    if (!click) {
      reject(new Error());
    }
  }, 3000);
});

firstPromise
  .then(() => addData('First promise was resolved', 'success'))
  .catch(() => addData('First promise was rejected', 'warning'));

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

secondPromise
  .then(() => addData('Second promise was resolved', 'success'));

const thirdPromise = new Promise((resolve) => {
  let click = false;
  let contextmenu = false;

  document.addEventListener('click', () => {
    click = true;

    if (contextmenu) {
      resolve();
    }
  });

  document.addEventListener('contextmenu', () => {
    contextmenu = true;

    if (click) {
      resolve();
    }
  });
});

thirdPromise
  .then(() => addData('Third promise was resolved', 'success'));

function addData(message, classValue) {
  const elem = document.createElement('div');

  elem.setAttribute('data-qa', 'notification');
  elem.className = classValue;
  elem.innerText = message;

  return document.body.append(elem);
}
