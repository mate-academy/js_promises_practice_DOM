'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const doc = document.querySelector('body');

  const timerId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  doc.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve(`First promise was resolved`);
      clearTimeout(timerId);
    }
  });
});

const secondPromise = new Promise((resolve, reject) => {
  const doc = document.querySelector('body');
  const mouseHandler = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve(`Second promise was resolved`);
      doc.removeEventListener('mousedown', mouseHandler);
    }
  };

  doc.addEventListener('mousedown', mouseHandler);
});

const thirdPromise = new Promise((resolve, reject) => {
  const doc = document.querySelector('body');
  let leftClicked = false;
  let rightClicked = false;

  doc.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    } else if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve(`Third promise was resolved`);
    }
  });
});

function success(message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = 'success';
  div.textContent = message;
  document.body.appendChild(div);
}

function error(errorObject) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = 'error';
  div.textContent = errorObject.message;
  document.body.appendChild(div);
}

firstPromise.then(success).catch(error);
secondPromise.then(success);
thirdPromise.then(success);
