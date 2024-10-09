'use strict';

const doc = document;
let leftClick = false;
let rightClick = false;

const promise1 = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    const error = 'First promise was rejected';

    reject(error);
  }, 3000);

  doc.addEventListener('click', (ev) => {
    clearTimeout(timer);
    leftClick = true;
    resolve('First promise was resolved');
  });
});

const promise2 = new Promise((resolve, reject) => {
  doc.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    rightClick = true;
    resolve('Second promise was resolved');
  });

  doc.addEventListener('click', (ev) => {
    leftClick = true;
    resolve('Second promise was resolved');
  });
});

function proms(promResult, theMessage) {
  const body = document.querySelector('body');
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(promResult ? 'success' : 'error');
  div.textContent = theMessage;
  body.appendChild(div);
}

function checkBothClicks() {
  if (leftClick && rightClick) {
    const promise3 = new Promise((resolve, reject) => {
      resolve('Third promise was resolved');
    });

    promise3.then((message) => {
      proms(true, message);
    });
  }
}

// Handling first promise
promise1
  .then((message) => {
    proms(true, message);
    checkBothClicks();
  })
  .catch((error) => {
    proms(false, error);
  });

// Handling second promise
promise2.then((message) => {
  proms(true, message);
  checkBothClicks();
});
