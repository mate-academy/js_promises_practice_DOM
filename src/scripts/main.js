'use strict';

function ensureRoot() {
  let root = document.querySelector('[data-qa="notification"]');

  if (!root) {
    root = document.createElement('div');
    root.setAttribute('data-qa', 'notification');
    document.body.appendChild(root);
  }

  return root;
}

function showMessage(text, type = 'success') {
  const root = ensureRoot();

  root.className = type;

  root.textContent = root.textContent ? `${root.textContent}\n${text}` : text;
}

const isLeft = (e) => e.type === 'click' && e.button === 0;
const isRight = (e) => e.type === 'contextmenu' || e.button === 2;

const firstPromise = new Promise((resolve, reject) => {
  let settled = false;

  const onClick = (e) => {
    if (!settled && isLeft(e)) {
      settled = true;
      cleanup();
      resolve('First promise was resolved');
    }
  };

  const timer = setTimeout(() => {
    if (!settled) {
      settled = true;
      cleanup();
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected');
    }
  }, 3000);

  function cleanup() {
    clearTimeout(timer);
    document.removeEventListener('click', onClick, true);
  }

  document.addEventListener('click', onClick, true);
});

firstPromise.then(
  (msg) => showMessage(msg, 'success'),
  (err) => showMessage(String(err), 'error'),
);

const secondPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (isLeft(e) || isRight(e)) {
      remove();
      resolve('Second promise was resolved');
    }
  };

  function remove() {
    document.removeEventListener('click', handler, true);
    document.removeEventListener('contextmenu', handler, true);
  }

  document.addEventListener('click', handler, true);
  document.addEventListener('contextmenu', handler, true);
});

secondPromise.then(
  (msg) => showMessage(msg, 'success'),
  (err) => showMessage(String(err), 'error'),
);

const thirdPromise = new Promise((resolve) => {
  let left = false;
  let right = false;

  const handler = (e) => {
    if (isLeft(e)) {
      left = true;
    }

    if (isRight(e)) {
      right = true;
    }

    if (left && right) {
      remove();
      resolve('Third promise was resolved');
    }
  };

  function remove() {
    document.removeEventListener('click', handler, true);
    document.removeEventListener('contextmenu', handler, true);
  }

  document.addEventListener('click', handler, true);
  document.addEventListener('contextmenu', handler, true);
});

thirdPromise.then(
  (msg) => showMessage(msg, 'success'),
  (err) => showMessage(String(err), 'error'),
);
