'use strict';

const RESOLVE_MSG = ' promise was resolved';
const REJECT_MSG = ' promise was rejected';
const ERR_CLASS = 'error-message';

const firstPromise = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    reject(new Error('First' + REJECT_MSG));
  }, 3000);

  document.addEventListener(
    'click',
    () => {
      clearTimeout(timeout);
      resolve('First' + RESOLVE_MSG);
    },
    { once: true },
  );
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener(
    'mousedown',
    (ev) => {
      const button = ev.button;

      if (button === 0 || button === 2) {
        resolve('Second' + RESOLVE_MSG);
      }
    },
    { once: true },
  );
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('mousedown', (ev) => {
    const button = ev.button;

    if (button === 0) {
      leftClicked = true;
    }

    if (button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third' + RESOLVE_MSG);
    }
  });
});

function pushNotification(message, err = false) {
  const element = document.createElement('div');

  element.classList.add('message', err && ERR_CLASS);
  element.textContent = message;
  element.setAttribute('data-qa', 'notification');

  document.body.append(element);
}

function onSuccess(message) {
  pushNotification(message);
}

function onError(error) {
  pushNotification(error.message, true);
}

[firstPromise, secondPromise, thirdPromise].forEach((promise) => {
  promise.then(onSuccess).catch(onError);
});
