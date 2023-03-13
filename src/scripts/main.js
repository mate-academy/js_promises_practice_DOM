'use strict';

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(reject, 3000);
});

promise1
  .then(resolveHandler)
  .catch(rejectHandler);

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    event.preventDefault();
    resolve('Second promise was resolved');
  });
});

promise2
  .then(resolveHandler)
  .catch(rejectHandler);

const promise3 = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve(`Third promise was resolved`);
    }
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;

    if (leftClick && rightClick) {
      event.preventDefault();
      resolve(`Third promise was resolved`);
    }
  });
});

promise3
  .then(resolveHandler)
  .catch(rejectHandler);

function resolveHandler(result) {
  const success = document.createElement('div');

  success.setAttribute('data-qa', 'notification');

  success.classList.add('success');

  success.innerHTML = `${result}`;

  document.body.append(success);
}

function rejectHandler() {
  const error = document.createElement('div');

  error.setAttribute('data-qa', 'notification');

  error.classList.add('warning');

  error.innerHTML = `
    First promise was rejected
  `;

  document.body.append(error);
}
