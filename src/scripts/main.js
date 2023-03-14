'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(reject, 3000);
});

firstPromise
  .then(handleResolve)
  .catch(handleReject);

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    event.preventDefault();
    resolve('Second promise was resolved');
  });
});

secondPromise
  .then(handleResolve);

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rigthClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rigthClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    rigthClick = true;

    if (leftClick && rigthClick) {
      e.preventDefault();
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then(handleResolve);

function handleResolve(result) {
  const success = document.createElement('div');

  success.setAttribute('data-qa', 'notification');
  success.classList.add('success');
  success.textContent = result;
  document.body.append(success);
}

function handleReject() {
  const error = document.createElement('div');

  error.setAttribute('data-qa', 'notification');
  error.classList.add('warning');
  error.textContent = 'First promise was rejected';
  document.body.append(error);
}
