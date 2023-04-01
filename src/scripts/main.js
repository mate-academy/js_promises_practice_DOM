'use strict';

function addMessage(state, text) {
  document.body.insertAdjacentHTML('beforeend', `
     <div data-qa="notification" class ="${state}">${text}</div>
  `
  );
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

firstPromise
  .then((result) => addMessage('success', result))
  .catch((error) => addMessage('warning', error));

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

secondPromise.then(result => {
  addMessage('success', result);
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick & rightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    rightClick = true;

    if (leftClick & rightClick) {
      e.preventDefault();
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise
  .then((result) => {
    addMessage('success', result);
  });
