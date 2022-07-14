'use strict';

const body = document.querySelector('body');
const successHandler = message => {
  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="success">
      ${message}
    </div>
  `);
};
const errorHandler = message => {
  body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="warning">
      ${message}
    </div>
  `);
};
const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', clickEvent => {
    clickEvent.preventDefault();

    if (clickEvent.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(reject, 3000, 'First promise was rejected');
});
const secondPromise = new Promise(resolve => {
  document.addEventListener('mousedown', clickEvent => {
    clickEvent.preventDefault();

    if (clickEvent.button === 0 || clickEvent.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});
const thirdPromise = new Promise(resolve => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', clickEvent => {
    if (clickEvent.button === 0) {
      leftClick = true;
    } else if (clickEvent.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler).catch(errorHandler);
thirdPromise.then(successHandler).catch(errorHandler);
