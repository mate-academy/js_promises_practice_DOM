'use strict';
/* eslint-disable prefer-promise-reject-errors */

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    reject('First promise was rejected');
  }, 3000);

  document.addEventListener('click', () => {
    clearTimeout(timerId);
    resolve('First promise was resolved');
  });
});

firstPromise
  .then((message) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add('success');
    div.textContent = `${message}`;
    body.append(div);
  })
  .catch((message) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add('error');
    div.textContent = `${message}`;
    body.append(div);
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (eve) => {
    eve.preventDefault();
    resolve('Second promise was resolved');
  });
});

secondPromise
  .then((message) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add('success');
    div.textContent = `${message}`;
    body.append(div);
  })
  .catch(() => {});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  function checkBothClicks() {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', () => {
    leftClicked = true;
    checkBothClicks();
  });

  document.addEventListener('contextmenu', (eve) => {
    eve.preventDefault();
    rightClicked = true;
    checkBothClicks();
  });
});

thirdPromise
  .then((message) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add('success');
    div.textContent = `${message}`;
    body.append(div);
  })
  .catch(() => {});
