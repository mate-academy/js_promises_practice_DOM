'use strict';

const body = document.querySelector('body');

const notification = (type, text) => {
  const message = document.createElement('div');

  body.append(message);
  message.className = `${type}`;
  message.setAttribute('data-qa', 'notification');
  message.innerText = `${text}`;
};

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  body.addEventListener('contextmenu', (eveent) => {
    eveent.preventDefault();

    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftButt = false;
  let rightButt = false;

  body.addEventListener('mousedown', (e) => {
    switch (e.button) {
      case 0:
        leftButt = true;
        break;

      case 2:
        rightButt = true;
        break;
    }

    if (leftButt && rightButt) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(
    resolve => notification(`success`, resolve),
    reject => notification(`warning`, reject)
  );

secondPromise
  .then(
    resolve => notification(`success`, resolve)
  );

thirdPromise.then(resolve => notification(`success`, resolve));
