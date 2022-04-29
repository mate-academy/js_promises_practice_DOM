'use strict';

const page = document.querySelector('html');
const body = document.querySelector('body');
let clicked = 0;

function firstPromise() {
  const resolver = (resolve, reject) => {
    page.addEventListener('click', () => {
      clicked = clicked + 1;
      resolve('First promise was resolved');
    });

    setTimeout(() => {
      if (clicked === 0) {
        reject('First promise was rejected');
      };
    }, 3000);
  };

  return new Promise(resolver);
};

firstPromise()
  .then(result => {
    const div = document.createElement('div');

    div.className = 'message success';
    div.setAttribute('data-qa', 'notification');
    div.textContent = result;
    body.append(div);
  })
  .catch(error => {
    const div = document.createElement('div');

    div.className = 'message warning';
    div.setAttribute('data-qa', 'notification');
    div.textContent = error;
    body.append(div);
  });

function secondPromise() {
  const resolver = (resolve, reject) => {
    page.addEventListener('click', () => {
      resolve('Second promise was resolved');
    });

    page.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      clicked = clicked + 1;
      resolve('Second promise was resolved');
    });
  };

  return new Promise(resolver);
};

secondPromise()
  .then(result => {
    const div = document.createElement('div');

    div.className = 'message message--second success';
    div.setAttribute('data-qa', 'notification');
    div.textContent = result;
    body.append(div);
  });

function thirdPromise() {
  const resolver = (resolve, reject) => {
    page.addEventListener('click', () => {
      if (clicked === 2) {
        resolve('Third promise was resolved');
      };
    });

    page.addEventListener('contextmenu', (e) => {
      if (clicked === 2) {
        resolve('Third promise was resolved');
      };
    });
  };

  return new Promise(resolver);
};

thirdPromise()
  .then(result => {
    const div = document.createElement('div');

    div.className = 'message message--third success';
    div.setAttribute('data-qa', 'notification');
    div.textContent = result;
    body.append(div);
  });
