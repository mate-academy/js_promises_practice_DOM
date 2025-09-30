'use strict';

document.addEventListener('DOMContentLoaded', () => {
  function showMessage(text, type) {
    const newDiv = document.createElement('div');

    newDiv.textContent = text;
    newDiv.setAttribute('data-qa', 'notification');

    if (type === 'success') {
      newDiv.classList.add('success');
    }

    if (type === 'error') {
      newDiv.classList.add('error');
    }

    document.body.appendChild(newDiv);
  }

  const firstPromise = new Promise((resolve, reject) => {
    let settled = false;

    function cleanup() {
      clearTimeout(timer);
      document.removeEventListener('click', clickHandler);
    }

    const timer = setTimeout(() => {
      if (!settled) {
        settled = true;
        cleanup();
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('First promise was rejected');
      }
    }, 3000);

    const clickHandler = (e) => {
      if (settled) {
        return;
      }

      if (e.button !== 0) {
        return;
      }
      settled = true;
      cleanup();
      resolve('First promise was resolved');
    };

    document.addEventListener('click', clickHandler);
  });

  const secondPromise = new Promise((resolve) => {
    let settled = false;

    const leftHandler = (e) => {
      if (settled) {
        return;
      }

      if (e.button !== 0) {
        return;
      }
      settled = true;
      cleanup();
      resolve('Second promise was resolved');
    };

    const rightHandler = (e) => {
      if (settled) {
        return;
      }

      if (e.button !== 2) {
        return;
      }
      settled = true;
      cleanup();
      resolve('Second promise was resolved');
    };

    function cleanup() {
      document.removeEventListener('click', leftHandler);
      document.removeEventListener('mousedown', rightHandler);
    }

    document.addEventListener('click', leftHandler);
    document.addEventListener('mousedown', rightHandler);
  });

  const thirdPromise = new Promise((resolve) => {
    let leftClicked = false;
    let rightClicked = false;
    let settled = false;

    const leftHandler = (e) => {
      if (settled) {
        return;
      }

      if (e.button !== 0) {
        return;
      }
      leftClicked = true;
      checkResolve();
    };

    const rightHandler = (e) => {
      if (settled) {
        return;
      }

      if (e.button !== 2) {
        return;
      }
      rightClicked = true;
      checkResolve();
    };

    function checkResolve() {
      if (leftClicked && rightClicked && !settled) {
        settled = true;
        cleanup();
        resolve('Third promise was resolved');
      }
    }

    function cleanup() {
      document.removeEventListener('click', leftHandler);
      document.removeEventListener('mousedown', rightHandler);
    }

    document.addEventListener('click', leftHandler);
    document.addEventListener('mousedown', rightHandler);
  });

  firstPromise
    .then((msg) => showMessage(msg, 'success'))
    .catch((err) => showMessage(err.message || err, 'error'));

  secondPromise.then((msg) => showMessage(msg, 'success'));
  thirdPromise.then((msg) => showMessage(msg, 'success'));
});
