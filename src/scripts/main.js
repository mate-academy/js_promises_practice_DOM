'use strict';

const bothButtons = [];

function createNotification(text, className) {
  document.body.insertAdjacentHTML('beforeend', `
    <div data-qa="notification" class="${className}">${text}</div>
  `);
};

const resolverFirst = (resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject('First promise was rejected');
  }, 3000);
};

const resolverSecond = (resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
};

const resolverThird = (resolve, reject) => {
  document.addEventListener('click', (ev) => {
    bothButtons.push(ev.button);

    if (bothButtons.includes(0) && bothButtons.includes(2)) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (ev) => {
    bothButtons.push(ev.button);

    if (bothButtons.includes(0) && bothButtons.includes(2)) {
      resolve('Third promise was resolved');
    }
  });
};

const firstPromise = new Promise(resolverFirst);
const secondPromise = new Promise(resolverSecond);
const thirdPromise = new Promise(resolverThird);

firstPromise
  .then((text) => {
    createNotification(text, 'success');
  })

  .catch((error) => {
    createNotification(error, 'error');
  });

secondPromise
  .then((text) => {
    createNotification(text, 'success');
  });

thirdPromise
  .then((text) => {
    createNotification(text, 'success');
  });
