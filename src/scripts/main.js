'use strict';

const body = document.querySelector('body');
const logo = document.querySelector('.logo');

logo.style.cursor = 'pointer';

new Promise((resolve, reject) => {
  const block = document.createElement('div');

  logo.addEventListener('click', () => {
    block.innerText = 'First promise was resolved';
    resolve(block);
  });

  setTimeout(() => {
    block.innerText = 'Error: First promise was rejected';
    reject(block);
  }, 3000);
})
  .then(el => body.append(el))
  .catch(el => body.append(el));

new Promise(resolve => {
  logo.addEventListener('click', () => {
    const block = document.createElement('div');

    block.innerText = 'Second promise was resolved';
    resolve(block);
  });
})
  .then(el => body.append(el));

new Promise(resolve => {
  const block = document.createElement('div');

  logo.addEventListener('click', () => {
    logo.addEventListener('contextmenu', (ev) => {
      ev.preventDefault();
      block.innerText = 'Third promise was resolved';
      resolve(block);
    });
  });
})
  .then(el => body.append(el));
