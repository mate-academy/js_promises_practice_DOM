'use strict';

let firstSettle = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (!firstSettle && e.button === 0) {
      firstSettle = true;
      resolve();
    }
  });

  setTimeout(() => {
    if (!firstSettle) {
      firstSettle = true;
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

function showMes(text, isError = false) {
  const mes = document.createElement('div');

  mes.setAttribute('data-qa', 'notification');
  mes.className = isError ? 'error' : 'success';
  mes.textContent = text;

  document.body.appendChild(mes);
}

firstPromise
  .then(() => {
    showMes('First promise was resolved');
  })
  .catch(() => {
    showMes('First promise was rejected', true);
  });

let secondResolved = false;

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (!secondResolved && (e.button === 0 || e.button === 2)) {
      secondResolved = true;
      resolve();
    }
  });
});

secondPromise.then(() => {
  showMes('Second promise was resolved');
});

let leftClicked = false;
let rightClicked = false;

let thirdSettle = false;

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (!thirdSettle) {
      if (e.button === 0) {
        leftClicked = true;
      }

      if (e.button === 2) {
        rightClicked = true;
      }

      if (leftClicked && rightClicked) {
        thirdSettle = true;
        resolve();
      }
    }
  });
});

thirdPromise.then(() => {
  showMes('Third promise was resolved');
});
