'use strict';

function createMsg(message, className) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(className);
  div.textContent = message;

  return div;
}

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
    document.removeEventListener('click', handler);
  }, 3000);

  const handler = (e) => {
    if (e.button === 0) {
      clearTimeout(timer);
      resolve('First promise was resolved');
      document.removeEventListener('click', handler);
    }
  };

  document.addEventListener('click', handler);
});

firstPromise
  .then((msg) => {
    document.body.appendChild(createMsg(msg, 'success'));
  })
  .catch((msg) => {
    document.body.appendChild(createMsg(msg, 'error'));
  });

const secondPromise = new Promise((resolve, reject) => {
  const handler = (e) => {
    e.preventDefault();

    if (e.button === 0 || e.type === 'contextmenu') {
      resolve('Second promise was resolved');
      document.removeEventListener('click', handler);
      document.removeEventListener('contextmenu', handler);
    }
  };

  document.addEventListener('click', handler);
  document.addEventListener('contextmenu', handler);
});

secondPromise.then((msg) => {
  document.body.appendChild(createMsg(msg, 'success'));
});

const thirdPromise = new Promise((resolve, reject) => {
  let left = false;
  let right = false;
  const handler = (e) => {
    if (e.button === 0) {
      left = true;
    }

    if (e.type === 'contextmenu') {
      right = true;
    }

    if (left === true && right === true) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', handler);
      document.removeEventListener('contextmenu', handler);
    }
  };

  document.addEventListener('click', handler);
  document.addEventListener('contextmenu', handler);
});

thirdPromise.then((msg) => {
  document.body.appendChild(createMsg(msg, 'success'));
});
