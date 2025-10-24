'use strict';

document.addEventListener('contextmenu', (e) => e.preventDefault());

const firstPromise = new Promise((resolve, reject) => {
  let isDone = false;

  document.addEventListener('click', (e) => {
    if (isDone) {
      return;
    }

    if (e.button === 0) {
      isDone = true;
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    if (!isDone) {
      isDone = true;
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected');
    }
  }, 3000);
});

firstPromise
  .then((message) => {
    const div = document.createElement('div');

    div.classList.add('success');
    div.textContent = message;
    div.setAttribute('data-qa', 'notification');
    document.body.append(div);
  })
  .catch((message) => {
    const div = document.createElement('div');

    div.classList.add('error');
    div.textContent = message;
    div.setAttribute('data-qa', 'notification');
    document.body.append(div);
  });

const secondPromise = new Promise((resolve) => {
  let isDone = false;

  document.addEventListener('click', (e) => {
    if (isDone) {
      return;
    }

    if (e.button === 0 || e.button === 2) {
      isDone = true;
      resolve('Second promise was resolved');
    }
  });
});

secondPromise.then((message) => {
  const div = document.createElement('div');

  div.classList.add('success');
  div.textContent = message;
  div.setAttribute('data-qa', 'notification');
  document.body.append(div);
});

const thirdPromise = new Promise((resolve) => {
  let isDone = false;
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('mousedown', (e) => {
    if (isDone) {
      return;
    }

    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      isDone = true;
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((message) => {
  const div = document.createElement('div');

  div.classList.add('success');
  div.textContent = message;
  div.setAttribute('data-qa', 'notification');
  document.body.append(div);
});
