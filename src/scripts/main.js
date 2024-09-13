'use strict';

const body = document.body;

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  body.addEventListener('click', () => {
    resolve('First promise was resolved');

    clearTimeout(timeoutId);
  });
});

firstPromise
  .then(() => {
    resultHandler(true, 'First');
  })
  .catch(() => {
    resultHandler(false, 'First');
  });

const secondPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  body.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

secondPromise.then(() => {
  resultHandler(true, 'Second');
});

const leftClickPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('left click happend');
  });
});

const rightClickPromise = new Promise((resolve, reject) => {
  body.addEventListener('contextmenu', () => {
    resolve('rigth click happend');
  });
});

Promise.all([leftClickPromise, rightClickPromise]).then(() => {
  return resultHandler(true, 'Third');
});

function resultHandler(isResolved, promiseNumber) {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');

  if (isResolved) {
    message.classList.add('success');

    message.textContent = `${promiseNumber} promise was resolved`;
  } else {
    message.classList.add('error');
    message.textContent = `${promiseNumber} promise was rejected`;
  }

  body.append(message);
}
