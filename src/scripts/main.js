'use strict';

const firstPromiseSuccessMessage = 'First promise was resolved';
const firstPromiseErrorMessage = 'First promise was rejected';
const secondPromiseSuccessMessage = 'Second promise was resolved';
const thirdPromiseSuccessMessage = 'Third promise was resolved';

let leftClickHappened = false;
let rightClickHappened = false;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener(
    'click',
    () => resolve(firstPromiseSuccessMessage),
    { once: true },
  );

  setTimeout(() => {
    reject(firstPromiseErrorMessage);
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener(
    'click',
    () => resolve(secondPromiseSuccessMessage),
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      resolve(secondPromiseSuccessMessage);
    },
    { once: true },
  );
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    leftClickHappened = true;

    if (leftClickHappened && rightClickHappened) {
      resolve(thirdPromiseSuccessMessage);
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClickHappened = true;

    if (leftClickHappened && rightClickHappened) {
      resolve(thirdPromiseSuccessMessage);
    }
  });
});

function success(message) {
  const newElement = document.createElement('div');

  newElement.className = 'success';
  newElement.setAttribute('data-qa', 'notification');
  newElement.innerHTML = message;
  document.body.appendChild(newElement);
}

function error(message) {
  const newElement = document.createElement('div');

  newElement.className = 'error';
  newElement.setAttribute('data-qa', 'notification');
  newElement.innerHTML = message;
  document.body.appendChild(newElement);
}

firstPromise.then(success).catch(error);
secondPromise.then(success);
thirdPromise.then(success);
