'use strict';

function addMassege(style, text) {
  const message = document.createElement('div');

  message.classList = style;
  message.innerText = text;
  message.setAttribute('data-qa', 'notification');
  document.body.append(message);
}

const clickPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 1 || e.button === 2) {
      resolve();
    }
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

const LeftOrRightClickPromise = new Promise(resolve => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve();
    }
  });
});

const LeftAndRightClickPromise = new Promise(resolve => {
  let rightCheck = false;
  let leftCheck = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      rightCheck = true;
    }

    if (e.button === 2) {
      leftCheck = true;
    }

    if (leftCheck && rightCheck) {
      resolve();
    }
  });
});

clickPromise.then(() => {
  addMassege('success', 'First promise was resolved');
}).catch(() => {
  addMassege('warning', 'First promise was rejected');
});

LeftOrRightClickPromise.then(() => {
  addMassege('success', 'Second promise was resolved!');
});

LeftAndRightClickPromise.then(() => {
  addMassege('success', 'Third promise was resolved');
});
