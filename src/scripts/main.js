'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then(res => {
    promiseAnswer(res, 'success');
  })
  .catch(err => {
    promiseAnswer(err, 'success');
  });

const secondPromise = new Promise((resolve) => {
  document.body.addEventListener('mouseup', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });

  document.body.addEventListener('contextmenu', evt => {
    evt.preventDefault();
  });
});

secondPromise
  .then(res => {
    promiseAnswer(res, 'success');
  });

const thirdPromise = new Promise((resolve) => {
  let leftButton = false;
  let rightButton = false;

  document.body.addEventListener('mouseup', (e) => {
    if (e.button === 0) {
      leftButton = true;
    }

    if (e.button === 2) {
      rightButton = true;
    }

    if (leftButton && rightButton) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then(res => {
    promiseAnswer(res, 'success');
  });

function promiseAnswer(answer, type) {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa='notification' class='${type}'>${answer}</div>
  `);
}
