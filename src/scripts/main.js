'use strict';

function createNotification(promiseName, className, condition) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = `${className}`;
  div.textContent = `${promiseName} promise was ${condition}`;
  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  document.addEventListener('click', () => {
    clicked = true;
    resolve();
  });

  setTimeout((error) => {
    if (!clicked) {
      reject(error);
    }
  }, 3000);
});

firstPromise
  .then(() => {
    createNotification('First', 'success', 'resolved');
  })
  .catch(() => {
    createNotification('First', 'warning', 'rejected');
  });

const secondPromise = new Promise((resolve) => {
  ['click', 'contextmenu'].forEach(e => {
    document.addEventListener(e, () => {
      resolve();
    });
  });
});

secondPromise
  .then(() => {
    createNotification('Second', 'success', 'resolved');
  });

let leftClicked = false;
let rightClicked = false;

const leftClick = new Promise((resolve) => {
  document.addEventListener('click', () => {
    leftClicked = true;
    resolve();
  });
});

const rightClick = new Promise((resolve) => {
  document.addEventListener('contextmenu', () => {
    rightClicked = true;
    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  Promise.all([leftClick, rightClick]).then(() => {
    if (leftClicked && rightClicked) {
      resolve();
    }
  });
});

thirdPromise
  .then(() => {
    createNotification('Third', 'success', 'resolved');
  });
