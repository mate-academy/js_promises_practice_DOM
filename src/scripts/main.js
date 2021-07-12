'use strict';

const body = document.querySelector('body');

new Promise((resolve, reject) => {
  const block = document.createElement('div');

  body.addEventListener('click', () => {
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
  body.addEventListener('click', () => {
    const block = document.createElement('div');

    block.innerText = 'Second promise was resolved';
    resolve(block);
  });
})
  .then(el => body.append(el));

new Promise(resolve => {
  const block = document.createElement('div');

  body.addEventListener('click', () => {
    body.addEventListener('contextmenu', (ev) => {
      ev.preventDefault();
      block.innerText = 'Third promise was resolved';
      resolve(block);
    });
  });
})
  .then(el => body.append(el));
