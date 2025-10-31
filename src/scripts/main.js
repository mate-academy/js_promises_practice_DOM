'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    document.body.removeEventListener('mousedown', handler);
    reject(new Error('First promise was rejected'));
  }, 3000);

  function handler(e) {
    if (e.button === 0) {
      clearTimeout(timerId);
      document.body.removeEventListener('mousedown', handler);
      resolve('First promise was resolved');
    }
  }
  document.body.addEventListener('mousedown', handler);
});

firstPromise
  .then((msg) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.textContent = msg;
    div.classList.add('success');
    document.body.append(div);
  })
  .catch((error) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.textContent = error.message;
    div.classList.add('error');
    document.body.append(div);
  });

const secondPromise = new Promise((resolve) => {
  function handler(e) {
    if (e.button === 2) {
      e.preventDefault();
    }

    if (e.button === 0 || e.button === 2) {
      document.body.removeEventListener('mousedown', handler);
      resolve('Second promise was resolved');
    }
  }
  document.body.addEventListener('mousedown', handler);
});

secondPromise.then((msg) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.textContent = msg;
  div.classList.add('success');
  document.body.append(div);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  function handler(e) {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      e.preventDefault();
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      document.body.removeEventListener('mousedown', handler);
      resolve('Third promise was resolved');
    }
  }
  document.body.addEventListener('mousedown', handler);
});

thirdPromise.then((msg) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.textContent = msg;
  div.classList.add('success');
  document.body.append(div);
});
