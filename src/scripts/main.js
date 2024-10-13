'use strict';

const doc = document.querySelector('body');

let leftClick = false;
let rightClick = false;

const createDiv = (classN, textC) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = classN;
  div.textContent = textC;
  doc.appendChild(div);
};

const firstPromise = new Promise((resolve, reject) => {
  const rejectTimer = setTimeout(() => {
    reject(
      new Error(
        'First promise was rejected in 3 seconds if document not clicked',
      ),
    );
  }, 3000);

  doc.addEventListener('click', () => {
    clearTimeout(rejectTimer);
    resolve();
  });
});

firstPromise
  .then(() => {
    createDiv('success', 'First promise was resolved');
  })
  .catch(() => {
    createDiv('error', 'First promise was rejected');
  });

const secondPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (e.button === 0) {
      leftClick = true;
    } else if (e.button === 2) {
      rightClick = true;
    }
    resolve();
  };

  doc.addEventListener('click', handleClick);

  doc.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    handleClick(e);
  });
});

secondPromise.then(() => {
  createDiv('success', 'Second promise was resolved');
});

const thirdPromise = new Promise((resolve) => {
  const checkBothClicksAndResolve = () => {
    if (leftClick && rightClick) {
      resolve();
      doc.removeEventListener('click', checkBothClicksAndResolve);
      doc.removeEventListener('contextmenu', checkBothClicksAndResolve);
    }
  };

  doc.addEventListener('click', checkBothClicksAndResolve);
  doc.addEventListener('contextmenu', checkBothClicksAndResolve);
});

thirdPromise
  .then(() => {
    createDiv('success', 'Third promise was resolved');
  })
  .catch(() => {});
