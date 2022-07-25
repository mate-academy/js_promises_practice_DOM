'use strict';

const createNotification = (className, text) => {
  document.body.insertAdjacentHTML('beforeend', `
    <div class=${className}>
      ${text}
    </div>
  `);
};

const firstPromise = new Promise((resolve, reject) => {
  let isCLicked = false;

  document.addEventListener('click', () => {
    isCLicked = true;
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    if(!isCLicked) {
      reject('First promise was rejected');
    }
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (clickEvent) => {
    clickEvent.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let isLeftClicked;
  let isRightClicked;

  document.body.addEventListener('mousedown', (click) => {
    if (click.button === 0) {
      isLeftClicked = true;
    };

    if (click.button === 2) {
      isRightClicked = true;
    };

    if (isLeftClicked && isRightClicked) {
      resolve('Third promise was resolved')
    }
  })
});

firstPromise
  .then(res => createNotification('success', res))
  .catch(err => createNotification('warning', err))

secondPromise
  .then(res => createNotification('success', res));

thirdPromise
  .then(res => createNotification('success', res));
