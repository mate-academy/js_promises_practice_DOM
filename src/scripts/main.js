'use strict';

const body = document.querySelector(`body`);

const notificationHandler = (type, message) => {
  const div = document.createElement(`div`);

  div.dataset.qa = 'notification';
  div.classList.add = `${type}`;
  div.innerHTML = `${message}`;
  body.appendChild(div);
};

const firstPomise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('First promise was rejected')), 3000);

  document.addEventListener('mousedown', function(e) {
    if (e.button === 0 || e.button === 1 || e.button === 2) {
      resolve(`First promise was resolved`);
    }
  });
}).then(promise => notificationHandler(`success`, promise))
  .catch(err => {
    notificationHandler(`warning`, err);
  });

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', function(e) {
    if (e.button === 0 || e.button === 2) {
      resolve(`Second promise was resolved`);
    }
  });
}).then(promise => notificationHandler(`success`, promise));

function waitFor(number) {
  return new Promise(resolve => {
    document.addEventListener(`mousedown`, (e) => {
      if (e.button === number) {
        resolve();
      }
    });
  });
}

const thirdPromise = new Promise(resolve => {
  Promise.all([waitFor(0), waitFor(2)])
    .then(() => resolve('Third promise was resolved'));
}).then(promise => notificationHandler(`success`, promise));

firstPomise.catch();
secondPromise.catch();
thirdPromise.catch();
