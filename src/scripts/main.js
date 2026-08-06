'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
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
      resolve('Third promise was resolved');
    }
  });
});

const createDivForPromise = (type, value) => {
  const divEL = document.createElement('div');

  divEL.setAttribute('data-qa', 'notification');
  divEL.classList.add(type);
  divEL.textContent = value;
  document.body.appendChild(divEL);
};

firstPromise
  .then((value) => {
    createDivForPromise('success', value);
  })
  .catch((error) => {
    createDivForPromise('error', error.message);
  });

secondPromise.then(
  (value) => {
    createDivForPromise('success', value);
  },
  (error) => {
    createDivForPromise('error', error.message);
  },
);

thirdPromise.then(
  (value) => {
    createDivForPromise('success', value);
  },
  (error) => {
    createDivForPromise('error', error.message);
  },
);
