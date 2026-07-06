'use strict';

const clicks = [false, false];

let resolveFirstPromise;

const firstPromise = new Promise((resolve, reject) => {
  resolveFirstPromise = resolve;
  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

let resolveSecondPromise;

const secondPromise = new Promise((resolve) => {
  resolveSecondPromise = resolve;
});

let resolveThirdPromise;

const thirdPromise = new Promise((resolve, reject) => {
  resolveThirdPromise = resolve;
});

const createNotification = (text, isSuccess = true) => {
  const division = document.createElement('div');

  division.dataset.qa = 'notification';
  division.classList.add(isSuccess ? 'success' : 'error');
  division.textContent = text;
  document.body.appendChild(division);
};

const handleMouseClick = (e) => {
  if (e.type === 'contextmenu') {
    e.preventDefault();
    clicks[1] = true;
  } else if (e.type === 'click') {
    clicks[0] = true;
  }

  resolveSecondPromise('Second promise was resolved');

  if (clicks[0]) {
    resolveFirstPromise('First promise was resolved');
  }

  if (clicks[1] && clicks[0]) {
    resolveThirdPromise('Third promise was resolved');
  }
};

firstPromise
  .then((result) => createNotification(result, true))
  .catch((error) => createNotification(error.message, false));

secondPromise.then
  ((result) => createNotification(result, true))
  .catch((error) => createNotification(error.message, false));

thirdPromise.then((results) => {
  createNotification(results, true);
})
.catch((error) => {
  createNotification(error.message, false);
});

document.addEventListener('click', handleMouseClick);
document.addEventListener('contextmenu', handleMouseClick);
