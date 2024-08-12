'use strict';

const body = document.querySelector('body');

const promiseOne = new Promise((resolve, reject) => {
  let click = false;

  const clickHandler = (e) => {
    if (e.button === 0) {
      resolve();
      click = true;
      body.removeEventListener('click', clickHandler);
    }
  };

  body.addEventListener('click', clickHandler);

  if (!click) {
    setTimeout(() => {
      reject(Error);
    }, 3000);
  }
});

const promiseTwo = new Promise((resolve) => {
  const clickHandler = (e) => {
    if (e.button === 0 || e.button === 2) {
      e.preventDefault();
      resolve();
      body.removeEventListener('click', clickHandler);
      body.removeEventListener('contextmenu', clickHandler);
    }
  };

  body.addEventListener('click', clickHandler);
  body.addEventListener('contextmenu', clickHandler);
});

const promiseThree = new Promise((resolve) => {
  let rightClick = false;
  let leftClick = false;

  const clickHandler = (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      resolve();
      body.removeEventListener('click', clickHandler);
      body.removeEventListener('contextmenu', clickHandler);
    }
  };

  body.addEventListener('click', clickHandler);
  body.addEventListener('contextmenu', clickHandler);
});

const getMessage = (message, classType) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(classType);
  div.innerHTML = message;
  document.body.appendChild(div);
};

promiseOne
  .then(() => {
    getMessage('First promise was resolved', 'success');
  })
  .catch(() => {
    getMessage('First promise was rejected', 'error');
  });

promiseTwo.then(() => {
  getMessage('Second promise was resolved', 'success');
});

promiseThree.then(() => {
  getMessage('Third promise was resolved', 'success');
});
