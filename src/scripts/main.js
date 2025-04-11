'use strict';

const onSuccess = (message) => {
  const divEl = document.createElement('div');
  divEl.className = 'success';
  divEl.textContent = message;
  document.body.append(divEl);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject('First promise was rejected');
  }, 3000);
});

firstPromise.then(onSuccess);

firstPromise.catch((message) => {
  const divEl = document.createElement('div');
  divEl.className = 'error';
  divEl.textContent = message;
  document.body.append(divEl);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

secondPromise.then(onSuccess);

const thirdPromise = new Promise((resolve) => {
  let wasClickedOnLeft;
  let wasClickedOnRight;

  document.addEventListener('click', () => {
    wasClickedOnLeft = true;

    if (wasClickedOnLeft && wasClickedOnRight === true) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    wasClickedOnRight = true;

    if (wasClickedOnLeft && wasClickedOnRight === true) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then(onSuccess);
