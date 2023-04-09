'use strict';

const rootElement = document.body;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First');
  });

  setTimeout(() => {
    reject(Error('First'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second');
  });

  document.addEventListener('contextmenu', (eventClick) => {
    eventClick.preventDefault();
    resolve('Second');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick;
  let rightClick;

  document.addEventListener('mousedown', (eventClick) => {
    switch (eventClick.button) {
      case 0:
        leftClick = true;
        break;

      case 2:
        rightClick = true;
        break;

      default:
        break;
    };

    leftClick && rightClick && resolve('Third');
  });
});

function onSuccess(promiseName) {
  rootElement.insertAdjacentHTML('beforeend', `
    <div class="success" data-qa="notification">
      ${promiseName} promise was resolved
    </div>
  `);
}

function onError(promiseName) {
  rootElement.insertAdjacentHTML('beforeend', `
  <div class="warning" data-qa="notification">
    ${promiseName} promise was rejected
  </div>
  `);
}

firstPromise
  .then(onSuccess)
  .catch(onError);

secondPromise
  .then(onSuccess);

thirdPromise
  .then(onSuccess);
