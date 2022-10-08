'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  const leftClick = waitFor('click');

  leftClick
    .then(() => resolve('First promise was resolved'));

  setTimeout(reject, 3000, 'First promise was rejected');
});

const secondPromise = new Promise((resolve) => {
  const leftClick = waitFor('click');
  const rightClick = waitFor('contextmenu');

  leftClick
    .then(() => resolve('Second promise was resolved'));

  rightClick
    .then(() => resolve('Second promise was resolved'));
});

const thirdPromise = new Promise(resolve => {
  const leftClick = waitFor('click');
  const rightClick = waitFor('contextmenu');

  leftClick
    .then(() => rightClick)
    .then(() => resolve('Third promise was resolved'));
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

function waitFor(click) {
  return new Promise(resolve => {
    body.addEventListener(click, (e) => {
      if (click === 'contextmenu') {
        e.preventDefault();
      }

      resolve();
    });
  });
}
