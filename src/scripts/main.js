'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
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

    if (rightClick && leftClick) {
      resolve('Third promise was resolved');
    }
  });
});

const handleSuccess = (message) => {
  const divElem = document.createElement('div');

  divElem.className = 'notification success';
  divElem.setAttribute('data-qa', 'notification');
  divElem.textContent = message;
  document.body.appendChild(divElem);
};

const handleError = (message) => {
  const divElem = document.createElement('div');

  divElem.className = 'notification error';
  divElem.setAttribute('data-qa', 'notification');
  divElem.textContent = message;
  document.body.appendChild(divElem);
};

firstPromise.then(handleSuccess).catch(handleError);
secondPromise.then(handleSuccess);
thirdPromise.then(handleSuccess);
