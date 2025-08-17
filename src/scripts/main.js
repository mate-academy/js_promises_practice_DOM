'use strict';

function createNotification(type, message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = type;
  div.textContent = message;
  document.body.appendChild(div);
}

const withoutMenu = (e) => e.preventDefault();

const firstPromise = new Promise((resolve, reject) => {
  const onMouseDown = (e) => {
    if (e.button === 0) {
      cleanup();
      resolve('First promise was resolved');
    }
  };
  const time = setTimeout(() => {
    cleanup();
    reject(new Error('First promise was rejected'));
  }, 3000);

  function cleanup() {
    document.removeEventListener('mousedown', onMouseDown);
    clearTimeout(time);
  }
  document.addEventListener('mousedown', onMouseDown);
});

const secondPromise = new Promise((resolve) => {
  const onMouseDown = (e) => {
    if (e.button === 0 || e.button === 2) {
      cleanup();
      resolve('Second promise was resolved');
    }
  };

  function cleanup() {
    document.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('contextmenu', withoutMenu);
  }
  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('contextmenu', withoutMenu);
});

const thirdPromise = new Promise((resolve) => {
  const clickSeen = new Set();

  const onMouseDown = (e) => {
    if (e.button === 0 || e.button === 2) {
      clickSeen.add(e.button);

      if (clickSeen.has(0) && clickSeen.has(2)) {
        cleanup();
        resolve('Third promise was resolved');
      }
    }
  };

  function cleanup() {
    document.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('contextmenu', withoutMenu);
  }
  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('contextmenu', withoutMenu);
});

const success = (msg) => createNotification('success', msg);
const error = (msg) => createNotification('error', msg);

firstPromise.then(success, (err) => error(err.message));
secondPromise.then(success).catch((err) => error(err.message));
thirdPromise.then(success).catch((err) => error(err.message));
