'use strict';

function successHandler(message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'success';
  div.textContent = message;
  document.body.appendChild(div);
}

function errorHandler(error) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'error';
  div.textContent = error.message;
  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 && !clicked) {
      clicked = true;
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    if (!clicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (rightClicked && leftClicked) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler).catch(errorHandler);
thirdPromise.then(successHandler).catch(errorHandler);
