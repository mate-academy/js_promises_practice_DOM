'use strict';

const page = document;
const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  page.addEventListener('click', (e) => {
    resolve();
  });

  setTimeout(() => {
    reject(Error());
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  page.addEventListener('mousedown', (e) => {
    e.preventDefault();

    if (e.button === 0) {
      resolve();
    } else if (e.button === 2) {
      resolve();
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let flag = 0;

  page.addEventListener('mousedown', (e) => {
    e.preventDefault();

    if (e.button === 0 || e.button === 2) {
      flag++;
    }

    if (flag === 2) {
      flag = 0;
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    notification('success', 'First promise was resolved');
  })
  .catch(() => {
    notification('error', 'First promise was rejected');
  });

secondPromise
  .then(() => {
    notification('success', 'Second promise was resolved');
  })
  .catch();

thirdPromise
  .then(() => {
    notification('success', 'Third promise was resolved');
  })
  .catch();

function notification(type, message) {
  const blok = document.createElement('div');

  blok.classList.add(type);
  blok.setAttribute('data-qa', 'notification');
  blok.innerText = message;
  body.append(blok);
}
