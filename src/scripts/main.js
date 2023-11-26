'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve(`First promise was resolved`);
  });
  setTimeout(() => reject(new Error(`First promise was rejected`)), 3000);
});
const secondPromise = new Promise((resolve) => {
  document.addEventListener('mouseup', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve(`Second promise was resolved`);
    }
  });
});
const thirdPromise = new Promise((resolve) => {
  let leftClick;
  let rightClick;

  document.addEventListener('mouseup', handleThirdEvents);

  function handleThirdEvents(e) {
    if (e.button === 0) {
      rightClick = true;
    }

    if (e.button === 2) {
      leftClick = true;
    }

    if (rightClick && leftClick) {
      resolve(`Third promise was resolved`);
    }
  }
});

firstPromise.then(succesHandler).catch(errorHandler);
secondPromise.then(succesHandler).catch(errorHandler);
thirdPromise.then(succesHandler).catch(errorHandler);

function succesHandler(value) {
  const successDiv = document.createElement('div');

  successDiv.setAttribute('data-qa', 'notification');
  successDiv.classList.add('success');
  successDiv.innerText = value;
  document.body.appendChild(successDiv);
}

function errorHandler(err) {
  const successDiv = document.createElement('div');

  successDiv.setAttribute('data-qa', 'notification');
  successDiv.classList.add('warning');
  successDiv.innerText = err.message;
  document.body.appendChild(successDiv);
}
