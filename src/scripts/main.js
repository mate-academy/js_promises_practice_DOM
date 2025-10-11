'use strict';

function checkDiv() {
  let div = document.querySelector('[data-qa="notification"]');

  if (!div) {
    div = document.createElement('div');
    div.setAttribute('data-qa', 'notification');
    document.body.appendChild(div);
  }

  return div;
}

function showMessage(text, type = 'success') {
  const div = checkDiv();

  div.className = type;
  div.textContent = div.textContent ? `${div.textContent}\n${text}` : text;
}

// Helpers to detect clicks
const isLeft = (e) => e.type === 'click' && e.button === 0;
const isRight = (e) => e.type === 'contextmenu' || e.button === 2;

// --- FIRST PROMISE: resolves on left click, rejects after 3s ---
const firstPromise = new Promise((resolve, reject) => {
  let resolveOrReject = false;

  const onClick = (e) => {
    if (!resolveOrReject && isLeft(e)) {
      resolveOrReject = true;
      clean();
      resolve('First promise was resolved');
    }
  };

  const timer = setTimeout(() => {
    if (!resolveOrReject) {
      resolveOrReject = true;
      clean();
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected');
    }
  }, 3000);

  function clean() {
    clearTimeout(timer);
    document.removeEventListener('click', onClick, true);
  }

  document.addEventListener('click', onClick, true);
});

firstPromise.then(
  (msg) => showMessage(msg, 'success'),
  (err) => showMessage(String(err), 'error'),
);

// --- SECOND PROMISE: resolves on any left or right click ---
const secondPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (isLeft(e) || isRight(e)) {
      removeListeners();
      resolve('Second promise was resolved');
    }
  };

  function removeListeners() {
    document.removeEventListener('click', handler, true);
    document.removeEventListener('contextmenu', handler, true);
  }

  document.addEventListener('click', handler, true);
  document.addEventListener('contextmenu', handler, true);
});

secondPromise.then((msg) => showMessage(msg, 'success'));

// --- THIRD PROMISE: resolves after both left AND right click ---
const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const handler = (e) => {
    if (isLeft(e)) {
      leftClicked = true;
    }

    if (isRight(e)) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      removeListeners();
      resolve('Third promise was resolved');
    }
  };

  function removeListeners() {
    document.removeEventListener('click', handler, true);
    document.removeEventListener('contextmenu', handler, true);
  }

  document.addEventListener('click', handler, true);
  document.addEventListener('contextmenu', handler, true);
});

thirdPromise.then((msg) => showMessage(msg, 'success'));
