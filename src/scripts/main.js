'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftButtonDown = false;
  let rightButtonDown = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftButtonDown = true;
    }

    if (e.button === 2) {
      rightButtonDown = true;
    }

    if (leftButtonDown && rightButtonDown) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      leftButtonDown = false;
    }

    if (e.button === 2) {
      rightButtonDown = false;
    }
  });
});

firstPromise
  .then(text =>
    document.querySelector('.logo')
      .insertAdjacentHTML('afterbegin', `
      <div data-qa="notification" class='success'>${text}</div>
      <br>
      `)
  )
  .catch(text =>
    document.querySelector('.logo')
      .insertAdjacentHTML('afterbegin', `
      <div data-qa="notification" class='error'>${text}</div>
      <br>
      `)
  );

secondPromise
  .then(text =>
    document.querySelector('.logo')
      .insertAdjacentHTML('afterbegin', `
      <div data-qa="notification" class='success'>${text}</div>
      <br>
      `)
  );

thirdPromise
  .then(text =>
    document.querySelector('.logo')
      .insertAdjacentHTML('afterbegin', `
      <div data-qa="notification" class='success'>${text}</div>
      <br>
      `)
  );
