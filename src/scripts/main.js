'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });

  document.body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let mouseLeft = false;
  let mouseRight = false;

  document.body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      mouseLeft = true;
    }

    if (e.button === 2) {
      mouseRight = true;
    }

    if (mouseLeft && mouseRight) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(res => createMessage('sucsses', res))
  .catch(err => createMessage('warning', err));

secondPromise
  .then(res => createMessage('sucsses', res));

thirdPromise
  .then(res => createMessage('sucsses', res));

const createMessage = (className, textContent) => {
  document.body.insertAdjacentHTML('beforebegin', `
  <div class="${className}" qa="notification">
    ${textContent}
  </div>
  `);
};
