'use strict';

const body = document.querySelector('body');

function notification(type, textMessage) {
  const newDiv = document.createElement('div');

  newDiv.setAttribute('data-qa', 'notification');
  newDiv.className = type;
  newDiv.textContent = textMessage;
  body.append(newDiv);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });
  setTimeout(() => reject(new Error()), 3000);
});

firstPromise
  .then(() => {
    notification('success', 'First promise was resolved');
  })
  .catch(() => {
    notification('error', 'First promise was rejected');
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', () => {
    resolve();
  });
});

secondPromise
  .then(() => {
    notification('success', 'Second promise was resolved');
  })
  .catch(() => {
    notification('error', 'Second promise was rejected');
  });

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
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

thirdPromise
  .then(() => {
    notification('success', 'Third promise was resolved');
  })
  .catch(() => {
    notification('error', 'Third promise was rejected');
  });
