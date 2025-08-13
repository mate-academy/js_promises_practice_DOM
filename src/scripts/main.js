'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise(function (resolve, reject) {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise(function (resolve, reject) {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise(function (resolve, reject) {
  let leftClk = false;
  let rightClk = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClk = true;
      checkClicks();
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClk = true;
    checkClicks();
  });

  function checkClicks() {
    if (leftClk && rightClk) {
      resolve('Third promise was resolved');
    }
  }
});

function resolved(value) {
  const divResolve = document.createElement('div');

  divResolve.classList.add('success');
  divResolve.setAttribute('data-qa', 'notification');
  divResolve.textContent = value;
  body.appendChild(divResolve);
}

function rejected(value) {
  const divReject = document.createElement('div');

  divReject.setAttribute('data-qa', 'notification');
  divReject.classList.add('error');

  const cutted = String(value.message);

  divReject.textContent = cutted;

  body.appendChild(divReject);
}

firstPromise.then((value) => resolved(value)).catch((value) => rejected(value));

secondPromise
  .then((value) => resolved(value))
  .catch((value) => rejected(value));

thirdPromise.then((value) => resolved(value)).catch((value) => rejected(value));
