/* eslint-disable function-paren-newline */
'use strict';

const body = document.body;

const showNotification = (message, isError = false) => {
  const div = document.createElement('div');

  div.className = isError ? 'error' : 'success';
  div.setAttribute('data-qa', 'notification');
  div.textContent = message;
  body.appendChild(div);
};

const promise1 = new Promise((resolve, reject) => {
  const rejectId = setTimeout(
    () => reject(new Error('First promise was rejected')),
    3000,
  );

  const handleClick = () => {
    clearTimeout(rejectId);
    resolve('First promise was resolved');
    document.removeEventListener('click', handleClick);
  };

  document.addEventListener('click', handleClick);
});

const promise2 = new Promise((resolve) => {
  const resolveAndRemoveListeners = (message) => {
    resolve(message);
    document.removeEventListener('click', handleLeftClick);
    document.removeEventListener('contextmenu', handleRightClick);
  };

  const handleLeftClick = () =>
    resolveAndRemoveListeners('Second promise was resolved');
  const handleRightClick = (e) => {
    e.preventDefault();
    resolveAndRemoveListeners('Second promise was resolved');
  };

  document.addEventListener('click', handleLeftClick);
  document.addEventListener('contextmenu', handleRightClick);
});

const promise3 = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const checkBothClicks = () => {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', handleLeftClick);
      document.removeEventListener('contextmenu', handleRightClick);
    }
  };

  const handleLeftClick = () => {
    leftClick = true;
    checkBothClicks();
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    rightClick = true;
    checkBothClicks();
  };

  document.addEventListener('click', handleLeftClick);
  document.addEventListener('contextmenu', handleRightClick);
});

[promise1, promise2, promise3].forEach((promise) =>
  promise
    .then((message) => showNotification(message))
    .catch((error) => showNotification(error.message, true)),
);
