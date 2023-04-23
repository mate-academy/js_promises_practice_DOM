'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = 0;
  let rightClick = 0;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick++;
    }

    if (e.button === 2) {
      rightClick++;
    }

    if (leftClick > 0 && rightClick > 0) {
      resolve('Third promise was resolved');
    }
  });
});

const success = (resolve) => {
  massegeHandler('success', resolve);
};

const error = (e) => {
  massegeHandler('warning', e.message);
};

function massegeHandler(classText, messegeText) {
  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="${classText}">
    ${messegeText}
    </div>
  `);
}

firstPromise
  .then(success)
  .catch(error);

secondPromise
  .then(success);

thirdPromise
  .then(success);
