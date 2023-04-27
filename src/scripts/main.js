'use strict';

const body = document.querySelector('body');
const div = document.createElement('div');

div.dataset.qa = 'notification';

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((result) => {
    div.className = 'succes';
    div.textContent = result;
    body.append(div.cloneNode(true));
  })

  .catch((result) => {
    div.className = 'warning';
    div.textContent = result;
    body.append(div.cloneNode(true));
  });

const secondPromise = new Promise((resolve) => {
  body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

secondPromise
  .then((result) => {
    div.className = 'succes';
    div.textContent = result;
    body.append(div.cloneNode(true));
  });

const thirdPromise = new Promise((resolve) => {
  body.addEventListener('click', () => {
    body.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      resolve('Third promise was resolved');
    });
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    body.addEventListener('click', () => {
      resolve('Third promise was resolved');
    });
  });
});

thirdPromise
  .then((result) => {
    div.className = 'succes';
    div.textContent = result;
    body.append(div.cloneNode(true));
  });
