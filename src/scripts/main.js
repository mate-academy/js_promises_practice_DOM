'use strict';

function block(className, text) {
  const div = document.createElement('div');

  div.classList.add('message');

  div.dataset.qa = 'notification';

  div.className = className;
  div.innerText = text;
  document.body.append(div);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(function() {
    reject(Error);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick, rightClick;

  document.addEventListener('click', () => {
    leftClick = true;
  });

  document.addEventListener('contextmenu', (e) => {
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
