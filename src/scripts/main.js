'use strict';

const body = document.querySelector('body');

const resolver = (resolve, reject) => {
  document.addEventListener('click', (e) => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject('First promise was rejected');
  }, 3000);
};

const resolver2 = (resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
};

const resolver3 = (resolve, reject) => {
  let leftButtonDown = false;
  let rightButtonDown = false;

  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftButtonDown = true;
    }

    if (e.button === 2) {
      rightButtonDown = true;
    }

    if (leftButtonDown && rightButtonDown) {
      resolve('Third promise was resolved');
    }
  });
};

const promise1 = new Promise(resolver);
const promise2 = new Promise(resolver2);
const promise3 = new Promise(resolver3);

promise1.then((text) => {
  const message = document.createElement('div');

  message.className = 'success';
  message.innerHTML = text;
  message.setAttribute('data-qa', 'notification');
  body.append(message);
}).catch((text) => {
  const message = document.createElement('div');

  message.className = 'error';
  message.innerHTML = text;
  message.setAttribute('data-qa', 'notification');
  body.append(message);
});

promise2.then((text) => {
  const message = document.createElement('div');

  message.className = 'success';
  message.innerHTML = text;
  message.setAttribute('data-qa', 'notification');
  body.append(message);
});

promise3.then((text) => {
  const message = document.createElement('div');

  message.className = 'success';
  message.innerHTML = text;
  message.setAttribute('data-qa', 'notification');
  body.append(message);
});
