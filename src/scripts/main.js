'use strict';

const body = document.querySelector('body');

function addMessage(textMessage, classMessage) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.className = classMessage;
  div.textContent = textMessage;

  body.append(div);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Succes');
  });

  setTimeout(() => {
    reject(new Error('Error'));
  }, 3000);
});

firstPromise.then(() => {
  addMessage('First promise was resolved', 'succes');
}).catch(() => {
  addMessage('First promise was rejected', 'warning');
});

const secondPromise = new Promise(resolve => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('succes');
    }
  });
});

secondPromise.then(() => {
  addMessage('Second promise was resolved', 'succes');
});

const thirdPromise = new Promise(resolve => {
  let leftClick = false;
  let rightClick = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve('succes');
    }
  });
});

thirdPromise.then(() => {
  addMessage('Third promise was resolved', 'succes');
});
