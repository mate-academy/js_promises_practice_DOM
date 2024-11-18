'use strict';

const doc = document.querySelector('body');

let isFirstPromiseResolved = false;
let isFirstPromiseRejected = false;

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    isFirstPromiseRejected = true;
    // eslint-disable-next-line prefer-promise-reject-errors
    reject();
  }, 3000);

  document.addEventListener(
    'click',
    () => {
      if (!isFirstPromiseRejected) {
        clearTimeout(timeoutId);
        isFirstPromiseResolved = true;
        resolve();
      }
    },
    { once: true },
  );
});

let secondPromiseResolved = false;
const secondPromise = new Promise((resolve) => {
  const handleResolve = () => {
    if (!secondPromiseResolved) {
      secondPromiseResolved = true;
      resolve();
    }
  };

  document.addEventListener('click', handleResolve, { once: true });

  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      handleResolve();
    },
    { once: true },
  );
});

let leftClick = false;
let rightClick = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve();
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;

    if (leftClick && rightClick) {
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    if (!isFirstPromiseRejected) {
      const resolveDiv = document.createElement('div');

      resolveDiv.setAttribute('data-qa', 'notification');
      resolveDiv.classList.add('success');
      resolveDiv.textContent = 'First promise was resolved';
      doc.append(resolveDiv);
    }
  })
  .catch(() => {
    if (!isFirstPromiseResolved) {
      const rejectDiv = document.createElement('div');

      rejectDiv.setAttribute('data-qa', 'notification');
      rejectDiv.classList.add('error');
      rejectDiv.textContent = 'First promise was rejected';
      doc.append(rejectDiv);
    }
  });

secondPromise.then(() => {
  const resolveDiv = document.createElement('div');

  resolveDiv.setAttribute('data-qa', 'notification');
  resolveDiv.classList.add('success');
  resolveDiv.textContent = 'Second promise was resolved';
  doc.append(resolveDiv);
});

thirdPromise.then(() => {
  const resolveDiv = document.createElement('div');

  resolveDiv.setAttribute('data-qa', 'notification');
  resolveDiv.classList.add('success');
  resolveDiv.textContent = 'Third promise was resolved';
  doc.append(resolveDiv);
});
