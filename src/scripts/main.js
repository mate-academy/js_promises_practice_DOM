'use strict';

const logo = document.querySelector('.logo');
const body = document.querySelector('body');

const createDivElement = (content, nameOfClass = 'success') => {
  const div = document.createElement('div');

  div.className = nameOfClass;
  div.setAttribute('data-qa', 'notification');
  div.innerText = content;

  body.appendChild(div);
};

function waitForBothClicks() {
  return new Promise((resolve, reject) => {
    let leftClickHappened = false;
    let rightClickHappened = false;

    function checkBothClicks() {
      if (leftClickHappened && rightClickHappened) {
        resolve('Third promise was resolved');
      }
    }

    document.addEventListener('click', (e) => {
      if (e.button === 0) {
        // Left click
        leftClickHappened = true;
        checkBothClicks();
      } else if (e.button === 2) {
        // Right click
        rightClickHappened = true;
        checkBothClicks();
      }
    });

    // To prevent the context menu from appearing on right click
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  });
}

// eslint-disable-next-line promise/param-names
const firstPromise = new Promise((resolve, rejected) => {
  logo.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    rejected();
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  logo.addEventListener('click', () => {
    resolve();
  });
});

const thirdPromise = waitForBothClicks();

firstPromise
  .then(() => {
    createDivElement('First promise was resolved');
  })
  .catch(() => {
    createDivElement('First promise was rejected', 'error');
  });

secondPromise.then(() => {
  createDivElement('Second promise was resolved');
});

thirdPromise.then(() => {
  createDivElement('Third promise was resolved');
});
