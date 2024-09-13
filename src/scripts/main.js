'use strict';

function addSuccessHandler(message) {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div data-qa="notification" class="success">${message}</div>`,
  );
}

function addErrorHandler(message) {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div data-qa="notification" class="error">${message}</div>`,
  );
}

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', resolve);

  setTimeout(reject, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', resolve);
  document.body.addEventListener('contextmenu', resolve);
});

const thirdPromise = new Promise((resolve, reject) => {
  let click = false;
  let contextmenu = false;

  document.body.addEventListener('click', () => {
    click = true;

    if (contextmenu) {
      resolve();
    }
  });

  document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    contextmenu = true;

    if (click) {
      resolve();
    }
  });
});

firstPromise
  .then(() => addSuccessHandler('First promise was resolved'))
  .catch(() => addErrorHandler('First promise was rejected'));

secondPromise.then(() => addSuccessHandler('Second promise was resolved'));
thirdPromise.then(() => addSuccessHandler('Third promise was resolved'));
