'use strict';

const root = document.body;
const messageFunction = (message, className) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(className);
  div.textContent = message;
  root.append(div);
};

const firstPromise = new Promise((resolve, reject) => {
  root.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

firstPromise
  .then(() => {
    messageFunction('First promise was resolved', 'success');
  })
  .catch(() => {
    messageFunction('First promise was rejected', 'warning');
  });

const secondPromise = new Promise((resolve, reject) => {
  root.addEventListener('contextmenu', () => {
    resolve();
  });

  root.addEventListener('click', () => {
    resolve();
  });
});

secondPromise
  .then(() => {
    messageFunction('Second promise was resolved', 'success');
  });

const thirdPromise = new Promise((resolve, reject) => {
  root.addEventListener('click', () => {
    root.addEventListener('contextmenu', () => {
      resolve();
    });
  });

  root.addEventListener('contextmenu', () => {
    root.addEventListener('click', () => {
      resolve();
    });
  });
});

thirdPromise
  .then(() => {
    messageFunction('Third promise was resolved', 'success');
  });
