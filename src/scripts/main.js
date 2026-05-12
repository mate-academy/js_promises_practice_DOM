'use strict';

let resolveThird;

let lKlick = false;
let pKlick = false;

function checkClicks() {
  if (lKlick === true && pKlick === true) {
    resolveThird('Third promise was resolved');
  }
}

function isReject(num = 'First') {
  const thisIsBad = document.createElement('div');

  thisIsBad.dataset.qa = 'notification';
  thisIsBad.className = 'error';
  thisIsBad.innerText = num;
  document.querySelector('body').append(thisIsBad);
}

function isResolved(num) {
  const thisgood = document.createElement('div');

  thisgood.dataset.qa = 'notification';
  thisgood.className = 'success';
  thisgood.textContent = num;
  document.body.appendChild(thisgood);
}

// #region 1 Promsise

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', () => {
    lKlick = true;
    checkClicks();
    clearTimeout(timerId);
    resolve('First promise was resolved');
  });
});

firstPromise
  .then((message) => {
    isResolved(message);
    lKlick = true;
  })

  .catch((error) => {
    isReject(error.message);
  });

// #endregion

// #region 2 Promise
const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    lKlick = true;
    checkClicks();
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    pKlick = true;
    e.preventDefault();
    resolve('Second promise was resolved');
    checkClicks();
  });
});

secondPromise
  .then((message) => {
    isResolved(message);
  })
  .catch((error) => {
    isReject(error.message);
  });
// #endregion

// #region 3 Promise

const thirdPromise = new Promise((resolve, reject) => {
  resolveThird = resolve;
});

thirdPromise
  .then((message) => {
    isResolved(message);
  })
  .catch((error) => {
    isReject(error.message);
  });

// // #endregion
