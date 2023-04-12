'use strict';

const page = document.querySelector('html');
const body = document.querySelector('body');
let clicked = 0;
let clickedR = 0;

function addMessage(result, className) {
  const div = document.createElement('div');

  div.className = `message ${className}`;
  div.setAttribute('data-qa', 'notification');
  div.textContent = result;
  body.append(div);
};

function firstPromise() {
  const resolver = (resolve, reject) => {
    page.addEventListener('click', () => {
      clicked = 1;
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
    addMessage(result, 'success');
  })
  .catch(error => {
    addMessage(error, 'warning');
  });

function secondPromise() {
  const resolver = (resolve, reject) => {
    page.addEventListener('click', () => {
      resolve('Second promise was resolved');
    });

    page.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      clickedR = 1;
      resolve('Second promise was resolved');
    });
  };

  return new Promise(resolver);
};

secondPromise()
  .then(result => {
    addMessage(result, 'message--second success');
  });

function thirdPromise() {
  const resolver = (resolve, reject) => {
    page.addEventListener('click', () => {
      if (clicked === 1 && clickedR === 1) {
        resolve('Third promise was resolved');
      };
    });

    page.addEventListener('contextmenu', (e) => {
      if (clicked === 1 && clickedR === 1) {
        resolve('Third promise was resolved');
      };
    });
  };

  return new Promise(resolver);
};

thirdPromise()
  .then(result => {
    addMessage(result, 'message--third success');
  });
