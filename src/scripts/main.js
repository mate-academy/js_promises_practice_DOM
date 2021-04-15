'use strict';

const div = document.createElement('div');

document.body.append(div);

const createElement = (innerText, className) => {
  const paragraph = document.createElement('p');

  paragraph.innerText = innerText;
  paragraph.className = className;
  paragraph.dataset.qa = 'notification';

  div.append(paragraph);
  div.className = 'block';
};

new Promise((resolve, reject) => {
  document.body.addEventListener('click', e => {
    if (e.target.className === 'logo') {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
})
  .then(message => createElement(message, 'success'))
  .catch(error => createElement(error, 'error'));

new Promise((resolve, reject) => {
  document.body.addEventListener('mousedown', e => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
}).then(message => createElement(message, 'success'));

new Promise((resolve, reject) => {
  let rightClick = false;
  let leftClick = false;

  document.body.addEventListener('mousedown', e => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
}).then(message => createElement(message, 'success'));
