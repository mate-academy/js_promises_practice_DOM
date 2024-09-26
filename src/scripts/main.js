'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', e => {
    resolve('First promise was resolved');
  }, { once: true });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((message) => createContent(message))
  .catch((error) => (createContent(error)));

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', e => {
    resolve('Second promise was resolved');
  }, { once: true });

  document.addEventListener('contextmenu', e => {
    e.preventDefault();
    resolve('Second promise was resolved');
  }, { once: true });
});

secondPromise
  .then((message) => (createContent(message)))
  .catch((error) => (createContent(error)));

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = 0;
  let rightClick = 0;

  document.addEventListener('click', (e) => {
    e.preventDefault();
    leftClick++;
    checkClicks();
  }, { once: true });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick++;
    checkClicks();
  }, { once: true });

  function checkClicks() {
    if (leftClick > 0 && rightClick > 0) {
      resolve('Third promise was resolved');
    }
  };
});

thirdPromise
  .then((message) => createContent(message))
  .catch((error) => (createContent(error)));

function createContent(message) {
  const newDiv = document.createElement('DIV');

  newDiv.setAttribute('data-qa', 'notification');
  newDiv.classList.add('success');
  newDiv.textContent = message;

  document.body.appendChild(newDiv);
};
