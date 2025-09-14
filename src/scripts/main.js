'use strict';

document.addEventListener('contextmenu', (e) => { e.preventDefault() });

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('mousedown', handleClick);
  }, 3000)

  const handleClick = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClick);
    }
  }

  document.addEventListener('mousedown', handleClick)
})

const secondPromise = new Promise((resolve, reject) => {
  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', handleClick);
    }
  }

  document.addEventListener('mousedown', handleClick)
})

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  const handleClick = (e) => {
    if (e.button === 0) leftClick = true;
    if (e.button === 2) rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', handleClick);
    }
  }

  document.addEventListener('mousedown', handleClick)
})

function showMessage(message, type) {
  const messageEl = document.createElement('div');
  messageEl.setAttribute('data-qa', "notification")
  messageEl.className = type;
  messageEl.textContent = message;

  document.body.append(messageEl);
}

function processPromise(promise) {
  promise
    .then((resolve) => showMessage(resolve, 'success'))
    .catch((error) => showMessage(error.message, 'error'));
}

processPromise(firstPromise);
processPromise(secondPromise);
processPromise(thirdPromise);