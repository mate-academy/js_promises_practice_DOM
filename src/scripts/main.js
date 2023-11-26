'use strict';

const printMessage = (className, text) => {
  document.body.insertAdjacentHTML('beforeend',
    `<div class=${className} data-qa="notification">
      ${text}
    </div>`
  );
};

const promise1 = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved!');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected!'));
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved!');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved!');
  });
});

const promise3 = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  const leftClickListener = () => {
    leftClick = true;
    checkClicks();
  };

  const rightClickListener = () => {
    rightClick = true;
    checkClicks();
  };

  const checkClicks = () => {
    if (leftClick && rightClick) {
      document.removeEventListener('click', leftClickListener);
      document.removeEventListener('contextmenu', rightClickListener);
      resolve('Third promise was resolved!');
    }
  };

  document.addEventListener('click', leftClickListener);
  document.addEventListener('contextmenu', rightClickListener);
});

promise1
  .then(message => printMessage('success', message))
  .catch(error => printMessage('warning', error));

promise2
  .then(message => printMessage('success', message))
  .catch(error => printMessage('warning', error));

promise3
  .then(message => printMessage('success', message))
  .catch(error => printMessage('warning', error));
