'use strict';

let leftClick = false;
let rightClick = false;
const addMessage = (text, className) => {
  const div = document.createElement('div');

  document.body.append(div);
  div.dataset.qa = 'notification';
  div.classList.add(className);
  div.textContent = text;
};

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', e => {
    if (e.button === 0) {
      leftClick = true;
      resolve();
    }
  });

  setTimeout(() => {
    reject(new Error());
  }, 3000);
});

promise1
  .then(() => addMessage('First promise was resolved', 'succes'))
  .catch(() => addMessage('First promise was rejected', 'warning'));

const promise2 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', e => {
    if (e.button === 0 || e.button === 2) {
      rightClick = (!rightClick && e.button === 2) ? true : rightClick;
      resolve('Second promise was resolved');
    }
  });
});

promise2.then(result => addMessage(result, 'succes'));

const promise3 = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', e => {
    if (leftClick && rightClick) {
      resolve('Third promise was resolved', 'succes');
    }
  });
});

promise3.then(result => addMessage(result, 'succes'));
