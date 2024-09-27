'use strict';

function createMessages(type, promiseNum) {
  return type === 'success'
    ? root.insertAdjacentHTML('beforeend', `
        <div data-qa="success">${promiseNum} promise was resolved</div>
      `)
    : root.insertAdjacentHTML('beforeend', `
        <div data-qa="error">${promiseNum} promise was rejected</div>
      `);
}

const root = document.body;

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  document.addEventListener('contextmenu', e => {
    e.preventDefault();
    resolve();
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    document.addEventListener('contextmenu', () => {
      resolve();
    });
  });

  document.addEventListener('contextmenu', () => {
    document.addEventListener('click', () => {
      resolve();
    });
  });
});

firstPromise
  .then(() => {
    createMessages('success', 'First');
  }).catch(() => {
    createMessages('error', 'First');
  });

secondPromise
  .then(() => {
    createMessages('success', 'Second');
  });

thirdPromise
  .then(() => {
    createMessages('success', 'Third');
  });
