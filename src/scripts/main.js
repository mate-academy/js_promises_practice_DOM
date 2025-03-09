'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', () => {
    resolve();
  });

  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;
    areBothClicks(leftClick, rightClick);
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;
    areBothClicks(leftClick, rightClick);
  });

  function areBothClicks(left, right) {
    if (left && right) {
      resolve();
    }
  }
});

firstPromise
  .then(() => {
    createElement('success', 'First promise was resolved');
  })
  .catch((error) => {
    createElement('error', error.message);
  });

secondPromise.then(() => {
  createElement('success', 'Second promise was resolved');
});

thirdPromise.then(() => {
  createElement('success', 'Third promise was resolved');
});

function createElement(styleClass, text) {
  const divElement = document.createElement('div');

  divElement.setAttribute('data-qa', 'notification');
  divElement.classList.add(styleClass);
  divElement.innerText = text;
}
