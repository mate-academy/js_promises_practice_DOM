'use strict';

const body = document.body;

const onSuccess = (message) => {
  body.insertAdjacentHTML('beforeend',
    `<div data-qa="notification" class="success">
      ${message}
    </div>`,
  );
};

const onError = (message) => {
  body.insertAdjacentHTML('beforeend',
    `<div data-qa="notification" class="warning">
      ${message}
    </div>`,
  );
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftButton = false;
  let rightButton = false;

  document.addEventListener('mousedown', (mouseEvent) => {
    if (mouseEvent.button === 0) {
      leftButton = true;
    }

    if (mouseEvent.button === 2) {
      rightButton = true;
    }

    if (leftButton && rightButton) {
      resolve('Third promise was resolve');
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
