'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', (e) => {
    clearTimeout(timer);
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftBtnClicked = false;
  let rightBtnClicked = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftBtnClicked = true;
    }

    if (leftBtnClicked && rightBtnClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    rightBtnClicked = true;

    if (leftBtnClicked && rightBtnClicked) {
      resolve('Third promise was resolved');
    }
  });
});

function showNotification(text, rejected = false) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(rejected ? 'error' : 'success');
  div.textContent = text;
  document.body.append(div);
}

firstPromise
  .then((result) => showNotification(result))
  .catch((error) => showNotification(error.message, true));

secondPromise
  .then((result) => showNotification(result))
  .catch((error) => showNotification(error.message, true));

thirdPromise
  .then((result) => showNotification(result))
  .catch((error) => showNotification(error.message, true));
