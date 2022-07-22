'use strict';

const createNotification = (className, text) => {
  document.body.insertAdjacentHTML('beforeend', `
    <div
      data-qa="notification"
      class="notification notification--${className}">
        ${text}
    </div>
  `);
};

document.addEventListener('contextmenu', (e) => e.preventDefault());

const successNotification = (promiseNumber) =>
  createNotification('success', `${promiseNumber} promise was resolved!`);

const errorNotification = (promiseNumber) =>
  createNotification('warning', `${promiseNumber} promise was rejected!`);

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', resolve);

  setTimeout(reject, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', resolve)
    || document.addEventListener('contextmenu', resolve);
});

const thirdPromise = new Promise((resolve) => {
  let leftClick;
  let rightClick;

  document.body.addEventListener('mousedown', (click) => {
    if (click.button === 0) {
      leftClick = true;
    };

    if (click.button === 2) {
      rightClick = true;
    };

    if (leftClick && rightClick) {
      resolve();
    };
  });
});

firstPromise
  .then(() => successNotification('First'))
  .catch(() => errorNotification('First'));

secondPromise
  .then(() => successNotification('Second'));

thirdPromise
  .then(() => successNotification('Third'));
