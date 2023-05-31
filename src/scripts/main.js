'use strict';

const body = document.querySelector('body');

function apenndEl(response) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');

  if (response === 'resolve') {
    div.className = 'success';
  } else {
    div.className = 'error';
  }
  div.textContent = response;
  body.append(div);
}

let rightClick = false;
let leftClick = false;

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    if (!leftClick) {
      return reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', (e) => {
    e.button === 2 ? rightClick = true : leftClick = true;
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  body.addEventListener('mousedown', (e) => {
    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then((resolve) => apenndEl(resolve))
  .catch((reject) => apenndEl(reject));

secondPromise.then((resolve) => apenndEl(resolve));

thirdPromise.then((resolve) => apenndEl(resolve));
