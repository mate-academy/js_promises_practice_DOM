'use strict';

function getNotificationRoot() {
  let root = document.querySelector('[data-qa="notification"]');

  if (!root) {
    root = document.createElement('div');
    root.setAttribute('data-qa', 'notification');
    document.body.appendChild(root);
  }

  return root;
}

function showMessage(text, type = 'success') {
  const root = getNotificationRoot();
  const el = document.createElement('div');

  el.className = type === 'error' ? 'error' : 'success';
  el.textContent = text;
  root.appendChild(el);
}

function isLeft(e) {
  return e.button === 0;
}

function isRight(e) {
  return e.button === 2 || e.type === 'contextmenu';
}

const firstPromise = new Promise((resolve, reject) => {
  let settled = false;

  const onMouse = (e) => {
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
      reject(new Error('First promise was rejected'));
    }
  }, 3000);

  function cleanup() {
    clearTimeout(timer);
    document.removeEventListener('mousedown', onMouse, true);
  }

  document.addEventListener('mousedown', onMouse, true);
});

firstPromise.then(
  (msg) => showMessage(msg, 'success'),
  (err) => showMessage(err, 'error'),
);

const secondPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (isLeft(e) || isRight(e)) {
      remove();
      resolve('Second promise was resolved');
    }
  };

  function remove() {
    document.removeEventListener('mousedown', handler, true);
    document.removeEventListener('contextmenu', handler, true);
  }

  document.addEventListener('mousedown', handler, true);
  document.addEventListener('contextmenu', handler, true);
});

secondPromise.then((msg) => showMessage(msg, 'success'));

const thirdPromise = new Promise((resolve) => {
  const seen = { left: false, right: false };

  const handler = (e) => {
    if (isLeft(e)) {
      seen.left = true;
    }

    if (isRight(e)) {
      seen.right = true;
    }

    if (seen.left && seen.right) {
      remove();
      resolve('Third promise was resolved');
    }
  };

  function remove() {
    document.removeEventListener('mousedown', handler, true);
    document.removeEventListener('contextmenu', handler, true);
  }

  document.addEventListener('mousedown', handler, true);
  document.addEventListener('contextmenu', handler, true);
});

thirdPromise.then((msg) => showMessage(msg, 'success'));
