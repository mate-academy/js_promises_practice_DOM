'use strict';

function printMes(addClass, addText) {
  const message = document.createElement('div');

  message.classList.add(addClass);
  message.dataset.qa = 'notification';
  message.textContent = addText;

  document.body.append(message);
}

document.addEventListener('contextmenu', e => {
  e.preventDefault();
});

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(reject, 3000);

  document.addEventListener('mousedown', () => resolve());
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', e => {
    if (e.button === 0 || e.button === 2) {
      resolve();
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', e => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    printMes('success', 'First promise was resolved');
  })
  .catch(() => {
    printMes('warning', 'First promise was rejected');
  });

secondPromise
  .then(() => {
    printMes('success', 'Second promise was resolved');
  });

thirdPromise
  .then(() => {
    printMes('success', 'Third promise was resolved');
  });
