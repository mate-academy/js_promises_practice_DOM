'use strict';

const body = document.querySelector('body');

const message = (type, text) => {
  const messageSay = document.createElement('div');

  messageSay.className = `${type}`;
  messageSay.setAttribute('data-qa', 'notification');
  messageSay.innerText = `${text}`;

  body.append(messageSay);
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

  body.addEventListener('contextmenu', (withoutMenu) => {
    withoutMenu.preventDefault();

    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftB = false;
  let rightB = false;

  body.addEventListener('mousedown', (pressed) => {
    switch (pressed.button) {
      case 0:
        leftB = true;
        break;

      case 2:
        rightB = true;
        break;
    }

    if (leftB && rightB) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(
    resolve => message(`success1`, resolve),
    reject => message(`warning`, reject)
  );

secondPromise
  .then(
    resolve => message(`success2`, resolve)
  );

thirdPromise.then(resolve => message(`success3`, resolve));
