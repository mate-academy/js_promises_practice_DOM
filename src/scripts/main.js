'use strict';

let rigthClick = false;
let leftClick = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => resolve());

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  ['click', 'contextmenu'].forEach((action) => {
    document.addEventListener(action, () => resolve());
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    leftClick = true;
    checkClicks();
  });

  document.addEventListener('contextmenu', () => {
    rigthClick = true;
    checkClicks();
  });

  function checkClicks() {
    if (leftClick && rigthClick) {
      resolve();
    }
  }
});

firstPromise
  .then(() => createMessage('First promise was resolved'))
  .catch((e) => createMessage(e.message, e));

secondPromise.then(() => createMessage('Second promise was resolved'));
thirdPromise.then(() => createMessage('Third promise was resolved'));

function createMessage(message, error) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = error ? 'error' : 'success';
  div.innerText = message;

  document.body.append(div);
}
