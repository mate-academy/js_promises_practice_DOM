'use strict';

const body = document.querySelector('body');

function newMessage(text, condition) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(condition);
  div.textContent = text;
  body.append(div);
}

const promisLC = new Promise(resolve => {
  document.addEventListener('click', () => {
    resolve();
  });
});

const promisRC = new Promise(resolve => {
  document.addEventListener('contextmenu', () => {
    resolve();
  });
});

const firstPromise = new Promise((resolve, reject) => {
  promisLC.then(() => resolve('First promise was resolved'));
  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  Promise.race([promisLC, promisRC])
    .then((value) => resolve('Second promise was resolved'));
});

const thirdPromise = new Promise(resolve => {
  Promise.all([promisLC, promisRC])
    .then((value) => resolve('Third promise was resolved'));
});

firstPromise
  .then(message1 => newMessage(message1, 'success'))
  .catch(message1 => newMessage(message1, 'error'));

secondPromise.then(message2 => newMessage(message2, 'success'));

thirdPromise.then(message3 => newMessage(message3, 'success'));

//
