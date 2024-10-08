'use strict';

const doc = document.querySelector('body');

let leftClick = false;
let rightClick = false;
let firstPromiseRejected = false;

const createDiv = (classN, textC) => {
  const div = document.createElement('div');
  div.setAttribute('data-qa', 'notification');
  div.className = classN;
  div.textContent = textC;
  doc.appendChild(div);
};
const firstPromise = new Promise((resolve, reject) => {
  const rejectTimer = setTimeout(() => {
    createDiv('error', 'First promise was rejected');
    firstPromiseRejected = true;
    reject();
  }, 3000);

  doc.addEventListener('click', (e) => {
    if (e.button === 0 && !firstPromiseRejected) {
      clearTimeout(rejectTimer);
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    if (!firstPromiseRejected) {
      createDiv('success', 'First promise was resolved');
    }
  })
  .catch(() => {});

const secondPromise = new Promise((resolve) => {
  const handleClick = (e) => {
    if (!firstPromiseRejected) {
      if (e.button === 0) {
        leftClick = true;
      } else if (e.button === 2) {
        rightClick = true;
      }
      resolve();
    }
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

const thirdPromise = secondPromise.then(() => {
  return new Promise((resolve) => {
    const checkBothClicksAndResolve = () => {
      if (leftClick && rightClick) {
        createDiv('success', 'Third promise was resolved');
        resolve();
        doc.removeEventListener('click', checkBothClicksAndResolve);
        doc.removeEventListener('contextmenu', checkBothClicksAndResolve);
      }
    };

    doc.addEventListener('click', checkBothClicksAndResolve);
    doc.addEventListener('contextmenu', checkBothClicksAndResolve);
  });
});

secondPromise
  .then(() => {
    return thirdPromise;
  })
  .catch(() => {});
