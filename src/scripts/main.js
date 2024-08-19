'use strict';

const addClass = function (className, text) {
  const tag = document.createElement('div');

  tag.setAttribute('data-qa', 'notification');
  tag.className = className;
  tag.innerHTML = text;
  document.body.appendChild(tag);
};

const promise1 = new Promise((resolve, reject) => {
  const timeout = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', function (e) {
    if (e.button === 0) {
      clearTimeout(timeout);
      resolve('First promise was resolved');
    }
  });
});

promise1
  .then((message) => {
    addClass('message success-message', message);
  })
  .catch((err) => {
    addClass('message error-message', err.message);
  });

const promise2 = new Promise((resolve) => {
  document.addEventListener('click', function () {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

promise2.then((message) => {
  addClass('message', message);
});

const promise3 = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', function (e) {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  });
});

promise3.then((message) => {
  addClass('message success-message', message);
});
