'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timautId = setTimeout(() => {
    document.removeEventListener('click', clickHandle);
    reject(new Error('First promise was rejected in 3 seconds if not clicked'));
  }, 3000);

  function clickHandle(e) {
    if (e.button === 0) {
      clearTimeout(timautId);
      resolve('First promise was resolved on a left click in the document');
    }
  }
  document.addEventListener('click', clickHandle);
});

const secondPromise = new Promise((resolve) => {
  const handler = (e) => {
    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('mousedown', handler);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('mousedown', handler);
});

const thirrdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const checkClicks = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      document.removeEventListener('mousedown', checkClicks);

      resolve(`
        'Third promise was resolved only
        after both left and right clicks happened'`);
    }
  };

  document.addEventListener('mousedown', checkClicks);
});

const showNotifikation = (message, isError = false) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = isError ? 'error' : 'success';
  div.textContent = message;
  document.body.appendChild(div);
};

firstPromise
  .then((msg) => showNotifikation(msg, false))
  .catch((err) => showNotifikation(err.message, true));

secondPromise
  .then((msg) => showNotifikation(msg, false))
  .catch((err) => showNotifikation(err.message, true));

thirrdPromise
  .then((msg) => showNotifikation(msg, false))
  .catch((err) => showNotifikation(err.message, true));
