'use strict';

const firstPromiseSuccessMessage = 'First promise was resolved';
const firstPromiseErrorMessage = 'First promise was rejected';
const secondPromiseSuccessMessage = 'Second promise was resolved';
const thirdPromiseSuccessMessage = 'Third promise was resolved';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error('error'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    document.addEventListener('contextmenu', () => {
      resolve();
    });
  });
});

function success(message) {
  const newElement = document.createElement('div');

  newElement.className = 'success';
  newElement.setAttribute('data-qa', 'notification');
  newElement.innerHTML = message;
  document.appendChild(newElement);
}

function error(message) {
  const newElement = document.createElement('div');

  newElement.className = 'error';
  newElement.setAttribute('data-qa', 'notification');
  newElement.innerHTML = message;
  document.appendChild(newElement);
}

firstPromise
  .then(success(firstPromiseSuccessMessage))
  .catch(error(firstPromiseErrorMessage));

secondPromise.then(secondPromiseSuccessMessage);
thirdPromise.then(thirdPromiseSuccessMessage);
