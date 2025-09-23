'use strict';

function showNotification(type, message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = type === 'error' ? 'error' : 'success';
  div.textContent = message;
  document.body.append(div);
}

function waitForClickButton(targetButton) {
  return new Promise((resolve) => {
    let done = false;

    const onMouseDown = (e) => {
      if (!done && e.button === targetButton) {
        done = true;
        cleanup();
        resolve();
      }
    };

    const onContextMenu = () => {
      if (!done && targetButton === 2) {
        done = true;
        cleanup();
        resolve();
      }
    };

    function cleanup() {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('contextmenu', onContextMenu);
    }

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('contextmenu', onContextMenu);
  });
}

const firstPromise = new Promise((resolve, reject) => {
  let settled = false;

  const timerId = setTimeout(() => {
    if (!settled) {
      settled = true;
      cleanup();
      reject(new Error('First promise was rejected'));
    }
  }, 3000);

  const onLeftClick = (e) => {
    if (!settled && e.button === 0) {
      settled = true;
      cleanup();
      resolve('First promise was resolved');
    }
  };

  function cleanup() {
    clearTimeout(timerId);
    document.removeEventListener('mousedown', onLeftClick);
  }

  document.addEventListener('mousedown', onLeftClick);
});

firstPromise
  .then((message) => showNotification('success', message))
  .catch((err) => showNotification('error', err.message));

const secondPromise = new Promise((resolve) => {
  let done = false;

  const onMouseDown = (e) => {
    if (!done && (e.button === 0 || e.button === 2)) {
      done = true;
      cleanup();
      resolve('Second promise was resolved');
    }
  };

  const onContextMenu = () => {
    if (!done) {
      done = true;
      cleanup();
      resolve('Second promise was resolved');
    }
  };

  function cleanup() {
    document.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('contextmenu', onContextMenu);
  }

  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('contextmenu', onContextMenu);
});

secondPromise
  .then((message) => showNotification('success', message))
  .catch((err) => showNotification('error', err.message));

const thirdPromise = Promise.all([
  waitForClickButton(0),
  waitForClickButton(2),
]).then(() => 'Third promise was resolved');

thirdPromise
  .then((message) => showNotification('success', message))
  .catch((err) => showNotification('error', err.message));
