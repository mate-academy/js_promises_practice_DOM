'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(reject, 3000, 'First promise was rejected');
});

const secondPromise = new Promise((resolve) => {
  body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const rightClickPromise = new Promise(resolve => {
  body.addEventListener('click', () => {
    resolve();
  });
});

const leftClickPromise = new Promise(resolve => {
  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
});

const thirdPromise = new Promise(resolve => {
  rightClickPromise
    .then(() => {
      return leftClickPromise;
    })
    .then(() => {
      resolve('Third promise was resolved');
    });
});

firstPromise
  .then(result => {
    addMessage(result);
  })
  .catch(result => {
    addMessage(result);
  });

secondPromise
  .then(result => {
    addMessage(result);
  });

thirdPromise
  .then(result => {
    addMessage(result);
  });

function addMessage(result) {
  body.insertAdjacentHTML('afterbegin', `
    <div style="margin: 10px" data-qa="notification">
      ${result}
    </div>
  `);
};
