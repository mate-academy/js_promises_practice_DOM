'use strict';

let resolveThird;

let lKlick = false;
let pKlick = false;

function checkClicks() {
  if (lKlick === true && pKlick === true) {
    resolveThird();
  }
}

function isReject(num = 'First') {
  const thisIsBad = document.createElement('div');

  thisIsBad.dataset.qa = 'notification';
  thisIsBad.className = 'error';
  thisIsBad.innerText = `${num} promise was rejected`;
  document.querySelector('body').append(thisIsBad);
}

function isResolved(num = 'some') {
  const thisgood = document.createElement('div');

  thisgood.dataset.qa = 'notification';
  thisgood.className = 'success';
  thisgood.textContent = `${num} promise was resolved`;
  document.body.appendChild(thisgood);
}

// #region 1 Promsise

const promise1 = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', () => {
    lKlick = true;
    checkClicks();
    clearTimeout(timerId);
    resolve();
  });
});

promise1
  .then(() => {
    isResolved('First');
    lKlick = true;
  })

  .catch(() => {
    isReject();
  });

// #endregion

// #region 2 Promise
const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    lKlick = true;
    checkClicks();
    resolve();
  });

  document.addEventListener('contextmenu', (e) => {
    pKlick = true;
    e.preventDefault();
    resolve();
    checkClicks();
  });
});

promise2
  .then(() => {
    isResolved('Second');
  })
  .catch(() => {});
// #endregion

// #region 3 Promise

const promise3 = new Promise((resolve, reject) => {
  resolveThird = resolve;
});

promise3
  .then(() => {
    isResolved('Third');
  })
  .catch(() => {});

// // #endregion
