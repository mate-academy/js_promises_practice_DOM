'use strict';

function notification(type, message) {
  const element = document.createElement('div');

  element.setAttribute('data-qa', 'notification');
  element.className = type;
  element.textContent = message;

  document.body.appendChild(element);
}

const firstPromise = new Promise((resolve, reject) => {
  const successMessage = 'First promise was resolved';
  const errorMessage = 'First promise was rejected';

  function handleClick() {
    clearTimeout(timer);
    document.removeEventListener('click', handleClick);
    resolve(successMessage);
  }

  document.addEventListener('click', handleClick);

  const timer = setTimeout(() => {
    document.removeEventListener('click', handleClick);
    reject(errorMessage);
  }, 3000);
});

firstPromise
  .then((message) => notification('success', message))
  .catch((message) => notification('error', message));

const secondPromise = new Promise((resolve) => {
  const successMessage = 'Second promise was resolved';

  function handleClick() {
    cleanup();
    resolve(successMessage);
  }

  function handleRightClick(e) {
    e.preventDefault();
    cleanup();
    resolve(successMessage);
  }

  function cleanup() {
    document.removeEventListener('click', handleClick);
    document.removeEventListener('contextmenu', handleRightClick);
  }

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleRightClick);
});

secondPromise
  .then((message) => notification('success', message))
  .catch((message) => notification('error', message));

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;
  const successMessage = 'Third promise was resolved';

  function handleClick() {
    leftClick = true;
    check();
  }

  function handleRightClick(e) {
    e.preventDefault();
    rightClick = true;
    check();
  }

  function check() {
    if (leftClick && rightClick) {
      cleanup();
      resolve(successMessage);
    }
  }

  function cleanup() {
    document.removeEventListener('click', handleClick);
    document.removeEventListener('contextmenu', handleRightClick);
  }

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleRightClick);
});

thirdPromise
  .then((message) => notification('success', message))
  .catch((message) => notification('error', message));
