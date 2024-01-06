'use strict';

// write your code here
const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (ev) => {
    if (ev.button === 0) {
      resolve('First promise was resolved');
    }
  },
  { once: true },
  );

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (ev) => {
    resolve('Second promise was resolved');
  },
  { once: true },
  );

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    resolve('Second promise was resolved');
  },
  { once: true },
  );
});

let leftCnt = 0;
let rightCnt = 0;
const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', (ev) => {
    leftCnt++;
    thirdPromiseTrigger();
  },
  { once: true },
  );

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    rightCnt++;
    thirdPromiseTrigger();
  });

  function thirdPromiseTrigger() {
    if (leftCnt > 0 && rightCnt > 0) {
      resolve('Third promise was resolved');
    }
  }
});

function onSuccess(result) {
  const appendDiv = document.createElement('div');

  appendDiv.setAttribute('data-qa', 'notification');

  appendDiv.className = 'success';
  appendDiv.textContent = result;
  document.body.appendChild(appendDiv);
}

function onFailure(result) {
  const appendDiv = document.createElement('div');

  appendDiv.classList.add('warning');
  appendDiv.textContent = result;
  document.body.appendChild(appendDiv);
}

firstPromise
  .then(onSuccess)
  .catch(onFailure);

secondPromise
  .then(onSuccess)
  .catch(onFailure);

thirdPromise
  .then(onSuccess);

