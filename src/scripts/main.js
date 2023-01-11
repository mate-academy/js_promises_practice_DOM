'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.querySelector('body').addEventListener('click', function() {
    resolve();
  });

  setTimeout(() => reject(new Error('promise was rejected')), 3000);
});

firstPromise
  .then(() => {
    printMessage('First promise was resolved', 'success');
  })

  .catch(() => {
    printMessage('First promise was rejected', 'warning');
  });

const secondPromise = new Promise((resolve, reject) => {
  document.querySelector('body').addEventListener('click', function() {
    resolve();
  });

  document.querySelector('body').addEventListener('contextmenu', function() {
    resolve();
  });
});

secondPromise
  .then(() => {
    printMessage('Second promise was resolved', 'success');
  });

const thirdPromise = new Promise((resolve, reject) => {
  document.querySelector('body').addEventListener('click', function() {
    document.querySelector('body').addEventListener('contextmenu', function() {
      resolve();
    });
  });

  document.querySelector('body').addEventListener('contextmenu', function() {
    document.querySelector('body').addEventListener('click', function() {
      resolve();
    });
  });
});

thirdPromise.then(() => {
  printMessage('Third promise was resolved', 'success');
});

const printMessage = (message, type) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');

  div.className = type;

  div.innerText = message;
  document.body.append(div);
};
