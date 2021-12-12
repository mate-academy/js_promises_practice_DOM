'use strict';

function printInfo(result) {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="${result[0]}">
      ${result[1]}
    </div>
  `);
}

const firstPromise = new Promise((resolve, reject) => {
  const fail = ['error', 'First promise was rejected'];

  document.body.addEventListener('mousedown', (e) => {
    const click = e.button;

    if (click === 0 || click === 1 || click === 2) {
      resolve(['success', 'First promise was resolved']);
    }
  });

  setTimeout(() => {
    reject(fail);
  }, 3000);
});

const secondPromise = new Promise(resolve => {
  document.body.addEventListener('mousedown', (e) => {
    const click = e.button;

    if (click === 1) {
      return;
    }
    resolve(['success', 'Second promise was resolved']);
  });
});

const thirdPromise = new Promise(resolve => {
  let leftClick = false;
  let rightClick = false;

  document.body.addEventListener('mousedown', (e) => {
    const click = e.button;

    switch (click) {
      case 0:
        leftClick = true;
        break;

      case 2:
        rightClick = true;
        break;
    }

    if (leftClick && rightClick) {
      resolve(['success', 'Third promise was resolved']);
    }
  });
});

firstPromise
  .then(printInfo)
  .catch(printInfo);

secondPromise
  .then(printInfo);

thirdPromise
  .then(printInfo);
