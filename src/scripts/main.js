'use strict';

function addDiv(className, message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = className;
  div.textContent = message;

  document.body.append(div);
}

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', () => resolve());

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

firstPromise
  .then(() => {
    addDiv('success', 'First promise was resolved');
  })
  .catch(() => {
    addDiv('error', 'First promise was rejected');
  });

const secondPromise = new Promise((resolve) => {
  document.body.addEventListener('click', () => resolve());

  document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
});

secondPromise.then(() => {
  addDiv('success', 'Second promise was resolved');
});

const leftClick = new Promise((resolve) => {
  document.body.addEventListener('click', () => resolve());
});

const rightClick = new Promise((resolve) => {
  document.body.addEventListener('contextmenu', () => resolve());
});

const thirdPromise = Promise.all([leftClick, rightClick]);

thirdPromise.then(() => {
  addDiv('success', 'Third promise was resolved');
});
