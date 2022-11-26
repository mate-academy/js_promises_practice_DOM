'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => resolve('First promise was resolved'));

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

firstPromise
  .then((message) => {
    body.insertAdjacentHTML(
      'beforeend',
      `<div data-q="notification" class="msg msg--success1">${message}</div`
    );
  })
  .catch((error) => {
    body.insertAdjacentHTML(
      'beforeend',
      `<div
         data-q="notification"
         class="msg msg--warning1"
       >
       ${error.message}
       </div`
    );
  });

const secondPromise = new Promise((resolve) => {
  body.addEventListener('contextmenu', () =>
    resolve('Second promise was resolved')
  );

  body.addEventListener('click', () => resolve('Second promise was resolved'));
});

secondPromise.then((message) => {
  body.insertAdjacentHTML(
    'beforeend',
    `<div data-q="notification" class="msg msg--success2">${message}</div`
  );
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault(); // prevent right-click popup menu
    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((message) => {
  body.insertAdjacentHTML(
    'beforeend',
    `<div data-q="notification" class="msg msg--success3">${message}</div`
  );
});
