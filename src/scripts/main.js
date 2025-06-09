'use strict';

function showMessage(text, isError = false) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');

  div.textContent = text;
  div.classList.add(isError ? 'error' : 'success');
  document.body.appendChild(div);
}

function attachHandlers(promise) {
  promise
    .then((res) => {
      showMessage(res);
    })
    .catch((er) => showMessage(er, true));
}

let leftClicked = false;
let rightClicked = false;

const firstPromise = new Promise((resolve, reject) => {
  const firstHandler = (ev) => {
    if (ev.button === 0) {
      leftClicked = true;
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('mousedown', firstHandler, { once: true });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener(
    'mousedown',
    (ev) => {
      if (ev.button === 0 || ev.button === 2) {
        resolve('Second promise was resolved');
      }
    },
    { once: true },
  );
});

const thirdPromise = new Promise((resolve) => {
  const thirdHandler = (ev) => {
    if (ev.button === 0) {
      leftClicked = true;
    }

    if (ev.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', thirdHandler);
});

attachHandlers(firstPromise);
attachHandlers(secondPromise);
attachHandlers(thirdPromise);
