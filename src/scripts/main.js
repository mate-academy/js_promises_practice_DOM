'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(reject, 3000);
});

firstPromise
  .then(() => {
    showMessage('First promise was resolved', 'success');
  })
  .catch(() => {
    showMessage('First promise was rejected', 'error');
  });

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
});

secondPromise
  .then(() => {
    showMessage('Second promise was resolved', 'success');
  });

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rigthClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rigthClick) {
      resolve();
    }
  });

  document.addEventListener('contextmenu', (e) => {
    rigthClick = true;

    if (leftClick && rigthClick) {
      e.preventDefault();
      resolve();
    }
  });
});

thirdPromise
  .then(() => {
    showMessage('Third promise was resolved', 'success');
  });

function showMessage(result, type) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(type);
  div.textContent = result;
  document.body.append(div);
}
