'use strict';

const body = document.querySelector('body');
let isResolvedFirst = false;

function handleClk(e, resolve, reject) {
  if (e.button === 0) {
    resolve('First promise was resolved');
    isResolvedFirst = true;
    document.removeEventListener('mousedown', handleClkWrapper);
  }
}

let handleClkWrapper;

const firstPromise = new Promise(function (resolve, reject) {
  handleClkWrapper = (e) => handleClk(e, resolve, reject);
  document.addEventListener('mousedown', handleClkWrapper);

  const timeoutID = setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('First promise was rejected');
  }, 3000);

  if (isResolvedFirst) {
    clearTimeout(timeoutID);
  }
});

let isResolvedSecond = false;

const secondPromise = new Promise(function (resolve, reject) {
  function onMouse(e) {
    if (e.button === 0 && !isResolvedSecond) {
      resolve('Second promise was resolved');

      removeListners();
      isResolvedSecond = true;
    }
  }

  function onContextMenu(e) {
    e.preventDefault();

    if (!isResolvedSecond) {
      resolve('Second promise was resolved');
      isResolvedSecond = true;
    }
  }

  function removeListners() {
    document.removeEventListener('mousedown', onMouse);
    document.removeEventListener('contextmenu', onContextMenu);
  }

  document.addEventListener('contextmenu', onContextMenu);
  document.addEventListener('mousedown', onMouse);
});

let isResolvedThird = false;

const thirdPromise = new Promise(function (resolve, reject) {
  let leftClk = false;
  let rightClk = false;

  function onMouse(e) {
    if (e.button === 0) {
      leftClk = true;
      checkClicks();
    }
  }

  function onContextMenu(e) {
    e.preventDefault();
    rightClk = true;
    checkClicks();
  }

  function removeListners() {
    document.removeEventListener('mousedown', onMouse);
    document.removeEventListener('contextmenu', onContextMenu);
  }

  function checkClicks() {
    if (leftClk && rightClk && !isResolvedThird) {
      resolve('Third promise was resolved');
      isResolvedThird = true;

      removeListners();
    }
  }

  document.addEventListener('mousedown', onMouse);
  document.addEventListener('contextmenu', onContextMenu);
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

  divReject.textContent = value;

  body.appendChild(divReject);
}

firstPromise.then((value) => resolved(value)).catch((value) => rejected(value));

secondPromise
  .then((value) => resolved(value))
  .catch((value) => rejected(value));

thirdPromise.then((value) => resolved(value)).catch((value) => rejected(value));
