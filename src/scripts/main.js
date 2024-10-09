'use strict';

const doc = document;
let firstPromiseRes = false;
let secondPromiseRes = false;

const promise1 = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    const error = 'First promise was rejected';

    reject(error);
  }, 3000);

  doc.addEventListener('click', (ev) => {
    clearTimeout(timer);
    resolve('First promise was resolved');
  });
});

const promise2 = new Promise((resolve, reject) => {
  doc.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    resolve('Second promise was resolved');
  });

  doc.addEventListener('click', (ev) => {
    resolve('Second promise was resolved');
  });
});

function proms(promResult, theMessage) {
  const body = document.querySelector('body');
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');

  if (promResult) {
    div.classList.add('success');
  } else {
    div.classList.add('error');
  }
  div.textContent = `${theMessage}`;
  body.appendChild(div);
}

function checkCounter() {
  if (firstPromiseRes && secondPromiseRes) {
    const promise3 = new Promise((resolve, reject) => {
      resolve('Third promise was resolved');
    });

    promise3.then((message) => {
      proms(true, message);
    });
  }
}

promise1
  .then((message) => {
    firstPromiseRes = true;
    proms(true, message);
    checkCounter();
  })
  .catch((error) => {
    proms(false, error);
  });

promise2.then((message) => {
  secondPromiseRes = true;
  proms(true, message);
  checkCounter();
});
