'use strict';

const body = document.querySelector('body');

function apenndEl(response) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');

  div.className = response === 'resolve' ? 'success' : 'error';
  div.textContent = response;
  body.append(div);
}

const clickPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    return reject(new Error('First promise was rejected'));
  }, 3000);
});

const contextMenuPromise = new Promise(resolve => {
  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const secondPromise = new Promise(resolve => {
  Promise.any([clickPromise, contextMenuPromise])
    .then(value => resolve('Second promise was resolved'));
});

const thirdPromise = new Promise((resolve, reject) => {
  Promise.all([clickPromise, contextMenuPromise])
    .then(value => resolve('Third promise was resolved'));
});

clickPromise.then((resolve) => apenndEl(resolve))
  .catch((reject) => apenndEl(reject));

secondPromise.then((resolve) => apenndEl(resolve));

thirdPromise.then((resolve) => apenndEl(resolve));
