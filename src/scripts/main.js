'use strict';

function message(classLister, messageText) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(classLister);
  div.textContent = messageText;

  return div;
}

let leftClick = false;
let rightClick = false;

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error());
  }, 3000);

  const onClick = () => {
    leftClick = true;
    clearTimeout(timer);
    resolve();
    document.removeEventListener('click', onClick);
  };

  document.addEventListener('click', onClick);
});

firstPromise
  .then(() => {
    const successDiv = message('success', 'First promise was resolved');

    document.body.appendChild(successDiv);
  })
  .catch(() => {
    const errorDiv = message('error', 'First promise was rejected');

    document.body.appendChild(errorDiv);
  });

const secondPromise = new Promise((resolve) => {
  const onClick = (even) => {
    if (even.button === 0) {
      document.removeEventListener('click', onClick);
      document.removeEventListener('contextmenu', onClick);
      resolve('Second promise was resolved');
    }

    if (even.button === 2) {
      document.removeEventListener('contextmenu', onClick);
      document.removeEventListener('click', onClick);
      rightClick = true;
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('click', onClick);
  document.addEventListener('contextmenu', onClick);
});

secondPromise.then(() => {
  const secondDiv = message('success', 'Second promise was resolved');

  document.body.appendChild(secondDiv);
});

const thirdPromise = new Promise((resolve, reject) => {
  const dbClick = (dab) => {
    if (dab.type === 'click') {
      leftClick = true;
    }

    if (dab.type === 'contextmenu') {
      dab.preventDefault();
      rightClick = true;
    }

    if (leftClick && rightClick) {
      document.removeEventListener('click', dbClick);
      document.removeEventListener('contextmenu', dbClick);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', dbClick);
  document.addEventListener('contextmenu', dbClick);
});

thirdPromise.then(() => {
  const thirdDiv = message('success', 'Third promise was resolved');

  document.body.appendChild(thirdDiv);
});
