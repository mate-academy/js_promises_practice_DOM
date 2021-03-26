'use strict';

const body = document.querySelector('body');

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button !== 1) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let firstClick;
  let secondClick;

  document.addEventListener('mousedown', e => {
    const presedButton = e.button;

    presedButton === 0
      ? firstClick = true
      : secondClick = true;

    if (firstClick && secondClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((text) => {
    createMessage(text, 'success');
  })
  .catch((error) => {
    createMessage(error, 'warning');
  });
secondPromise.then((text, click) => createMessage(text, 'success'));
thirdPromise.then((text) => createMessage(text, 'success'));

function createMessage(message, result) {
  const block = document.createElement('div');

  block.innerText = message;
  block.setAttribute('data-qa', 'notification');
  block.classList.add(result);

  body.append(block);
}
