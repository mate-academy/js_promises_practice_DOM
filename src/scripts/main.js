'use strict';

function createElement(text, className) {
  const divElement = document.createElement('div');

  divElement.classList.add('notification', className);
  divElement.textContent = text;
  divElement.dataset.qa = 'notification';
  document.body.append(divElement);
}

const firstPromise = new Promise((resolve, reject) => {
  let isClick = false;

  document.addEventListener(
    'click',
    () => {
      isClick = true;
      resolve('First promise was resolved');
    },
    { once: true },
  );

  setTimeout(() => {
    if (!isClick) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

firstPromise
  .then((message) => {
    createElement(message, 'success');
  })
  .catch((err) => {
    createElement(err.message, 'error');
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener(
    'click',
    () => {
      resolve('Second promise was resolved');
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    () => {
      resolve('Second promise was resolved');
    },
    { once: true },
  );
});

secondPromise
  .then((message) => {
    createElement(message, 'success');
  })
  .catch((err) => {
    createElement(err.message, 'error');
  });

const thirdPromise = new Promise((resolve) => {
  let isClick = false;
  let isContextMen = false;

  document.addEventListener(
    'click',
    () => {
      isClick = true;

      if (isClick && isContextMen) {
        resolve('Third promise was resolved');
      }
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    () => {
      isContextMen = true;

      if (isClick && isContextMen) {
        resolve('Third promise was resolved');
      }
    },
    { once: true },
  );
});

thirdPromise
  .then((message) => {
    createElement(message, 'success');
  })
  .catch((err) => {
    createElement(err.message, 'error');
  });
