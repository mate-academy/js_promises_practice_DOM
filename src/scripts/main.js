'use strict';

const body = document.body;

const firstPromise = new Promise((resolve, reject) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  };

  setTimeout(() => {
    reject('First promise was rejected');
  }, 3000);

  document.addEventListener('click', handleClick);
});

const secondPromise = new Promise((resolve, reject) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('click', handleClick);
});


let leftClick = false;
let rightClick = false;

const thirdPromise = new Promise((resolve, reject) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');

      leftClick = false;
      rightClick = false;
    }
  };

  document.addEventListener('click', handleClick);
});

const success = (message) => {
  const div = document.createElement('div');
  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.textContent = message;
  body.appendChild(div);
};

const error = (message) => {
  const div = document.createElement('div');
  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  div.textContent = message;
  body.appendChild(div);
};

firstPromise.then(success).catch(error);

secondPromise.then(success);

thirdPromise.then(success);
