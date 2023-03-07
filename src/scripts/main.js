'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  document.addEventListener('click', () => {
    clicked = true;
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    if (!clicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let click = false;
  let contextMenu = false;

  document.addEventListener('click', () => {
    click = true;

    if (click && contextMenu) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    contextMenu = true;

    if (click && contextMenu) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(onSuccess)
  .catch(onError);

secondPromise
  .then(onSuccess)
  .catch(onError);

thirdPromise
  .then(onSuccess)
  .catch(onError);

function onSuccess(result) {
  document.body.insertAdjacentHTML('afterbegin', `
    <div data-qa="notification" class="success">
      ${result}
    </div>
  `);
}

function onError(error) {
  document.body.insertAdjacentHTML('afterbegin', `
    <div data-qa="notification" class="warning">
      ${error.message}
    </div>
  `);
}
