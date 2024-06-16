/* eslint-disable prefer-promise-reject-errors */
'use strict';

const promiseHelper = (namePromise, isError = false) => {
  const messageDiv = document.createElement('div');

  messageDiv.setAttribute('data-qa', 'notification');

  if (isError) {
    messageDiv.classList.add('error');
    messageDiv.textContent = `${namePromise} promise was rejected`;
  } else {
    messageDiv.classList.add('success');
    messageDiv.textContent = `${namePromise} promise was resolved`;
  }

  document.body.append(messageDiv);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => resolve('First'));
  setTimeout(() => reject('First'), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => resolve('Second'));
  document.addEventListener('contextmenu', () => resolve('Second'));
});

const thirdPromise = new Promise((resolve) => {
  const clicks = [false, false];

  document.addEventListener('click', () => {
    clicks.splice(0, 1, true);
    clicksCheck();
  });

  document.addEventListener('contextmenu', () => {
    clicks.splice(1, 1, true);
    clicksCheck();
  });

  const clicksCheck = () => clicks.every(Boolean) && resolve('Third');
});

firstPromise.then(promiseHelper).catch((first) => promiseHelper(first, true));
secondPromise.then(promiseHelper);
thirdPromise.then(promiseHelper);
