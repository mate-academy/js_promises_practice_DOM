'use strict';

const logo = document.querySelector('.logo');

function block(className, text) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';

  div.className = className;
  div.innerText = text;
  document.body.append(div);
}

const firstPromise = new Promise((resolve, reject) => {
  logo.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(function() {
    reject(Error);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  logo.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });

  logo.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick, rightClick;

  logo.addEventListener('click', () => {
    leftClick = true;
  });

  logo.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((result) => {
    block('success', result);
  })

  .catch(() => {
    block('error', 'First promise was rejected');
  });

secondPromise
  .then((result) => {
    block('success', result);
  });

thirdPromise
  .then((result) => {
    block('success', result);
  });
