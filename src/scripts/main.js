'use strict';

function showMessage(message, type) {
  const div = document.createElement('div');
  const body = document.querySelector('body');

  div.setAttribute('data-qa', 'notification');
  div.innerText = message;
  div.className = type;

  body.append(div);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    // eslint-disable-next-line
    reject('First promise was rejected');
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', (e) => {
    leftClicked = e.button === 0 || leftClicked;
    rightClicked = e.button === 2 || rightClicked;
    e.preventDefault();

    if (rightClicked && leftClicked) {
      resolve('Second promise was resolved');
    }
  });
});

firstPromise
  .then(message => {
    showMessage(message, 'success');
  })
  .catch(error => {
    showMessage(error, 'error');
  });

secondPromise
  .then(message => {
    showMessage(message, 'success');
  });

thirdPromise
  .then(message => {
    showMessage(message, 'success');
  });
