'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const onClick = (e) => {
    if (e.button === 0) {
      cleanUp();
      resolve('First promise was resolved');
    }
  };

  const timerId = setTimeout(() => {
    cleanUp();

    reject(new Error('First promise was rejected'));
  }, 3000);

  function cleanUp() {
    document.removeEventListener('click', onClick);
    clearTimeout(timerId);
  }
  document.addEventListener('click', onClick);
});

function showNotification(message, type) {
  const el = document.createElement('div');

  el.setAttribute('data-qa', 'notification');
  el.className = type;
  el.textContent = message;
  document.body.append(el);

  setTimeout(() => {
    el.remove();
  }, 3000);
}
firstPromise.then((message) => showNotification(message, 'success'));
firstPromise.catch((err) => showNotification(err.message, 'error'));

const secondPromise = new Promise((resolve) => {
  const onClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      if (e.button === 2) {
        e.preventDefault();
      }
      document.removeEventListener('click', onClick);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('click', onClick);
});

secondPromise.then((message) => showNotification(message, 'success'));

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  function onClick(e) {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
      e.preventDefault();
    }

    if (leftClicked && rightClicked) {
      document.removeEventListener('click', onClick);
      resolve('Third promise was resolved');
    }
  }
  document.addEventListener('click', onClick);
});

thirdPromise.then((message) => showNotification(message, 'success'));
