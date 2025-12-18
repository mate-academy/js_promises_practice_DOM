'use strict';

const successHandler = (message) => {
  const success = document.createElement('div');

  success.classList.add('success');
  success.setAttribute('data-qa', 'notification');
  success.textContent = message;
  document.body.appendChild(success);
};

const errorHandler = (message) => {
  const error = document.createElement('div');

  error.classList.add('error');
  error.setAttribute('data-qa', 'notification');
  error.textContent = message;
  document.body.appendChild(error);
};

const firstPromise = new Promise((resolve, reject) => {
  let isDone = false;

  const timerId = setTimeout(() => {
    if (!isDone) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);

  function handleClick(e) {
    if (e.button === 0 && !isDone) {
      isDone = true;
      resolve('First promise was resolved');
      clearTimeout(timerId);
      document.removeEventListener('click', handleClick);
    }
  }

  document.addEventListener('click', handleClick);
});

firstPromise.then(successHandler).catch((error) => {
  errorHandler(error.message);
});

const secondPromise = new Promise((resolve) => {
  let isDone = false;

  function handleClick(e) {
    e.preventDefault();

    if (!isDone && (e.button === 0 || e.button === 2)) {
      isDone = true;
      resolve('Second promise was resolved');
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleClick);
    }
  }
  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

secondPromise.then(successHandler);

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  function handleClick(e) {
    e.preventDefault();

    if (!leftClicked && e.button === 0) {
      leftClicked = true;
    }

    if (!rightClicked && e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', handleClick);
      document.removeEventListener('contextmenu', handleClick);
    }
  }
  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleClick);
});

thirdPromise.then(successHandler);
