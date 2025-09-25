'use strict';

function getNotificationEl() {
  const els = document.querySelectorAll('[data-qa="notification"]');

  if (els.length > 1) {
    els.forEach((element, i) => {
      if (i > 0) {
        element.remove();
      }
    });
  }

  let el = els[0];

  if (!el) {
    el = document.createElement('div');
    el.setAttribute('data-qa', 'notification');
    document.body.appendChild(el);
  }

  return el;
}

function setNotification(text, type) {
  const el = getNotificationEl();

  el.textContent = text;
  el.classList.remove('success', 'error');
  el.classList.add(type);
}

function showMessage(text) {
  setNotification(text, 'success');
}

function showError(error) {
  const msg = error instanceof Error ? error.message : String(error);

  setNotification(msg, 'error');
}

const firstPromise = new Promise((resolve, reject) => {
  const onClick = (e) => {
    if (e.button === 0) {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', onClick);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('mousedown', onClick);

  const timeoutId = setTimeout(() => {
    document.removeEventListener('mousedown', onClick);
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const onMouseDown = (e) => {
    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('mousedown', onMouseDown);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('mousedown', onMouseDown);
});

const thirdPromise = new Promise((resolve) => {
  let leftSeen = false;
  let rightSeen = false;
  let done = false;

  const onMouseDown = (e) => {
    if (done) {
      return;
    }

    if (e.button === 0) {
      leftSeen = true;
    }

    if (e.button === 2) {
      rightSeen = true;
    }

    if (leftSeen && rightSeen) {
      done = true;
      document.removeEventListener('mousedown', onMouseDown);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('mousedown', onMouseDown);
});

firstPromise.then(showMessage).catch(showError);
secondPromise.then(showMessage).catch(showError);
thirdPromise.then(showMessage).catch(showError);
