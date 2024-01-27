'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.body.addEventListener('contexmenu', (e) => {
    e.preventDefault();

    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let clickedLeft = false;
  let clickedRight = false;

  document.body.addEventListener('click', () => {
    clickedLeft = true;

    if (clickedLeft && clickedRight) {
      resolve('Third promise was resolved');
    }
  });

  document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    clickedRight = true;

    if (clickedLeft && clickedRight) {
      resolve('Third promise was resolved');
    }
  });
});

function addDivMessage(message, result) {
  document.body.insertAdjacentHTML('beforeend', `
    <div
      data-qa="notification"
      class="${result}"
    >
      ${message}
    </div>
  `);
}

firstPromise
  .then((message) => {
    addDivMessage(message, 'success');
  })
  .catch((message) => {
    addDivMessage(message, 'warning');
  });

secondPromise
  .then((message) => {
    addDivMessage(message, 'success');
  });

thirdPromise
  .then((message) => {
    addDivMessage(message, 'success');
  });
