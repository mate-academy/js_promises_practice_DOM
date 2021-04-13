'use strict';

const div = document.createElement('div');

document.body.append(div);

function addElement(text, className) {
  const p = document.createElement('p');

  p.innerText = text;
  p.className = className;

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
  document.body.addEventListener('click', (e) => {
    if (e.target.className === 'logo') {
      resolve('Second promise was resolved!');
    }
  });
});

promiseSecond.then(message => addElement(message, 'resolve-text'));
