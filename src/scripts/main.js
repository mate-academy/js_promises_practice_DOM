'use strict';

const bothButtons = [];

function printNotification(message, className) {
  document.body.insertAdjacentHTML('beforeend', `
      <div data-qa="notification" class="${className}">
        ${message}
      </div>
    `);
}

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

  document.addEventListener('contextmenu', (e) => {
    resolve('Second promise was resolved');
  });
};

const resolverThird = (resolve, reject) => {
  document.addEventListener('click', e => {
    bothButtons.push(e.button);

    if (bothButtons.includes(0) && bothButtons.includes(2)) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', e => {
    bothButtons.push(e.button);

    if (bothButtons.includes(0) && bothButtons.includes(2)) {
      resolve('Third promise was resolved');
    }
  });
};

const promiseFirst = new Promise(resolverFirst);
const promiseSecond = new Promise(resolverSecond);
const promiseThird = new Promise(resolverThird);

promiseFirst
  .then((data) => {
    printNotification(data, 'success');
  })
  .catch((error) => {
    printNotification(error, 'error');
  });

promiseSecond
  .then((data) => {
    printNotification(data, 'success');
  });

promiseThird
  .then((data) => {
    printNotification(data, 'success');
  });
