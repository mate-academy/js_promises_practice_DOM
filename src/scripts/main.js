'use strict';

let rightClick = false;
let leftClick = false;

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

const handleMouseUp = (mouseEvent) => {
  if (mouseEvent.button === 2) {
    rightClick = true;
  }

  if (mouseEvent.button === 0) {
    leftClick = true;
  }
};

const onSuccess = (message) => {
  document.body.insertAdjacentHTML('beforeend',
    `<div data-qa="notification" classs="success">
      ${message}
    </div>`
  );
};

const onError = (message) => {
  document.body.insertAdjacentHTML('beforeend',
    `<div data-qa="notification" class="warning">
      ${message}
    </div>`
  );
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click',
    () => resolve('First promise was resolved'));

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (mouseEvent) => {
    resolve('Second promise was resolved');
  });
});

firstPromise.then(
  value => onSuccess(value),
  error => onError(error)
);

secondPromise.then(
  value => onSuccess(value)
);

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('mouseup', (e) => {
    handleMouseUp(e);

    if (leftClick === true && rightClick === true) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then(
  value => onSuccess(value)
);
