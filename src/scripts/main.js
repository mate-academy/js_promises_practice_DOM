/* eslint-disable no-shadow */
'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  const clicker = () => {
    resolve();
    body.removeEventListener('click', clicker);
  };

  body.addEventListener('click', clicker);

  // eslint-disable-next-line no-unused-vars
  const timeout = setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject();
    body.removeEventListener('click', clicker);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  // eslint-disable-next-line no-shadow
  const clicker = (event) => {
    if (event.button === 0 || event.button === 2) {
      resolve();
      body.removeEventListener('click', clicker);
    }
  };

  body.addEventListener('click', clicker);
  body.addEventListener('contextmenu', clicker);
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  const clicker = (event) => {
    if (event.button === 0) {
      leftClick = true;
    } else if (event.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve();
      body.removeEventListener('click', clicker);
      body.addEventListener('contextmenu', clicker);
    }
  };

  body.addEventListener('click', clicker);
  body.addEventListener('contextmenu', clicker);
});

const createMessage = (text, isError = false) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');

  if (isError) {
    div.classList.add('error');
  }
  div.textContent = text;
  document.body.appendChild(div);
};
const successHandle = () => {
  createMessage('First promise was resolved');
};

const errorHandle = () => {
  createMessage('First promise was rejected', true);
};

const successHandleSecond = () => {
  createMessage('Second promise was resolved');
};

const successHandleThird = () => {
  createMessage('Third promise was resolved');
};

firstPromise.then(successHandle).catch(errorHandle);
secondPromise.then(successHandleSecond);
thirdPromise.then(successHandleThird);
