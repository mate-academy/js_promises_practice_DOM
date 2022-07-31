'use strict';

function onSuccess(result) {
  onResult('success', result);
}

function onError(result) {
  onResult('warning', result.message);
}

function onResult(handler, result) {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class=${handler}>${result}</div>
  `);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () =>
    resolve('First promise was resolved'));

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button !== 1) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    switch (e.button) {
      case 0:
        leftClick = true;
        break;
      case 2:
        rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise.then(onSuccess).catch(onError);
secondPromise.then(onSuccess);
thirdPromise.then(onSuccess);
