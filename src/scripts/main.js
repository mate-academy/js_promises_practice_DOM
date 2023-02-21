'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let isClicked = false;

  document.documentElement.addEventListener('click', () => {
    isClicked = true;
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    if (!isClicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise(resolve => {
  document.documentElement.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.documentElement.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise(resolve => {
  const LEFT_MOUSE_BUTTON = 0;
  const RIGHT_MOUSE_BUTTON = 2;
  let isLeftClicked = false;
  let isRightClicked = false;

  document.documentElement.addEventListener('mousedown', (e) => {
    if (e.button === LEFT_MOUSE_BUTTON) {
      isLeftClicked = true;
    }

    if (e.button === RIGHT_MOUSE_BUTTON) {
      isRightClicked = true;
    }

    if (isLeftClicked && isRightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

const succesHandler = (result) => {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="success">
      ${result}
    </div>
  `);
};

const errorHandler = (error) => {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="warning">
      ${error}
    </div>
  `);
};

firstPromise
  .then(succesHandler)
  .catch(errorHandler);

secondPromise.then(succesHandler);

thirdPromise.then(succesHandler);
