'use strict';

const createElement = (text, className) => {
  const messageBlock = document.createElement('div');

  messageBlock.innerText = text;
  messageBlock.className = 'message';
  messageBlock.classList.add(className);
  messageBlock.dataset.qa = 'notification';

  document.body.append(messageBlock);
};

new Promise((resolve, reject) => {
  document.body.addEventListener('click', () => {
    resolve('First promise was resolved!');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected!'));
  }, 3000);
}).then(message => createElement(message, 'success'))
  .catch(message => createElement(message, 'warning'));

new Promise((resolve) => {
  document.body.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved!');
    }
  });
}).then(message => createElement(message, 'success'));

new Promise(resolve => {
  let leftButton = false;
  let rightButton = false;

  document.body.addEventListener('mousedown', e => {
    if (e.button === 0) {
      leftButton = true;
    }

    if (e.button === 2) {
      rightButton = true;
    }

    if (leftButton && rightButton) {
      resolve('Third promise was resolved!');
    }
  });
}).then(message => createElement(message, 'success'));
