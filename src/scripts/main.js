'use strict';
/* eslint-disable prefer-promise-reject-errors */

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    reject('First promise was rejected');
    document.removeEventListener('click', onClick);
  }, 3000);

  function onClick() {
    clearTimeout(timerId);
    resolve('First promise was resolved');
  }

  document.addEventListener('click', onClick);
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
  function onLeftClick() {
    resolve('Second promise was resolved');
    document.removeEventListener('click', onLeftClick);
    document.removeEventListener('contextmenu', onRightClick);
  }

  function onRightClick(eve) {
    eve.preventDefault();
    resolve('Second promise was resolved');
    document.removeEventListener('click', onLeftClick);
    document.removeEventListener('contextmenu', onRightClick);
  }

  document.addEventListener('click', onLeftClick);
  document.addEventListener('contextmenu', onRightClick);
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
      document.removeEventListener('click', onLeftClick);
      document.removeEventListener('contextmenu', onRightClick);
    }
  }

  function onLeftClick() {
    leftClicked = true;
    checkBothClicks();
  }

  function onRightClick(eve) {
    eve.preventDefault();
    rightClicked = true;
    checkBothClicks();
  }
  document.addEventListener('click', onLeftClick);
  document.addEventListener('contextmenu', onRightClick);
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
