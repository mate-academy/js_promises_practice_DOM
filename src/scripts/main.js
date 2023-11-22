'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve(`First promise was resolved`);
  });
  setTimeout(() => reject(new Error(`First promise was rejected`)), 3000);
});
const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve(`Second promise was resolved`);
  });

  document.addEventListener('contextmenu', () => {
    resolve(`Second promise was resolved`);
  });
});
const thirdPromise = new Promise((resolve) => {
  let clicksCount = 0;

  document.addEventListener('click', handleThirdEvents);

  document.addEventListener('contextmenu', handleThirdEvents);

  function handleThirdEvents() {
    clicksCount++;

    if (clicksCount === 2) {
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
  err.name = '';
  successDiv.innerText = err.toString();
  document.body.appendChild(successDiv);
}
