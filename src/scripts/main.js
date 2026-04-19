'use strict';

let leftClicked = false;

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    if (!leftClicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClicked = true;
      clearTimeout(timer);
      resolve('First promised was resolved on a left click in the document');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

let left = false;
let right = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      left = true;
    }

    if (e.button === 2) {
      right = true;
    }

    if (left && right) {
      resolve('Third promise was resolved');
    }
  });
});

const showSuccess = (message) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = 'success';
  div.textContent = message;
  document.body.appendChild(div);
};

const showError = (message) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = 'error';
  div.textContent = message;
  document.body.appendChild(div);
};

firstPromise.then(showSuccess).catch(showError);
secondPromise.then(showSuccess);
thirdPromise.then(showSuccess);
