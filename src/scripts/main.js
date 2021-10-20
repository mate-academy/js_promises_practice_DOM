'use strict';

const notify = (state, message) => {
  const notification = `
    <div data-qa="notification" class=${state}>
      ${message}
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', notification);
};

const onSuccess = message => notify('success', message);
const onError = error => notify('warning', error.message);

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise(resolve => {
  document.addEventListener('mouseup', ({ button }) => {
    if (button === 0 || button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise(resolve => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mouseup', ({ button }) => {
    switch (button) {
      case 0:
        leftClick = true;
        break;

      case 2:
        rightClick = true;
        break;

      default:
        break;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then(onSuccess, onError);
secondPromise.then(onSuccess);
thirdPromise.then(onSuccess);
