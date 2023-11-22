'use strict';

// write your code here
const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (ev) => {
    if (ev.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (ev) => {
    if (ev.button === 0 || ev.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

let leftCnt = 0;
let rightCnt = 0;
const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (ev) => {
    // ev.preventDefault();

    if (ev.button === 0) {
      leftCnt++;
    }

    if (ev.button === 2) {
      rightCnt++;
    }

    if (leftCnt > 0 && rightCnt > 0) {
      resolve('Third promise was resolved');
    }
  });
});

function onSuccess(result) {
  // const appendDiv = document.createElement('div data-qa="notification"');
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
