'use strict';

const div = document.createElement('div');

document.body.append(div);

function addElement(text, className) {
  const p = document.createElement('p');

  p.innerText = text;
  p.className = className;
  p.dataset.qa = 'notification';

  div.append(p);
  div.className = 'created-block';
}

const promiseFirst = new Promise((resolve, reject) => {
  document.body.addEventListener('click', (e) => {
    if (e.target.className === 'logo') {
      resolve('First promise was resolved!');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected!'));
  }, 3000);
});

promiseFirst
  .then(message => addElement(message, 'resolve-text'))
  .catch(error => addElement(error, 'error-text'));

const promiseSecond = new Promise(resolve => {
  document.body.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved!');
    }
  });
});

promiseSecond.then(message => addElement(message, 'resolve-text'));

const promiseThird = new Promise(resolve => {
  let leftClick = false;
  let rightClick = false;

  document.body.addEventListener('mousedown', e => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved!');
    }
  });
});

promiseThird.then(result => addElement(result, 'resolve-text'));
