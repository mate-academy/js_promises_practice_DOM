'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', () => {
    clearTimeout(timerId);
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let isLeftClicked = false;
  let isRightClicked = false;

  document.addEventListener('click', () => {
    isLeftClicked = true;

    if (isRightClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    isRightClicked = true;

    if (isLeftClicked) {
      resolve('Third promise was resolved');
    }
  });
});

function onSuccess(message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'success';
  div.textContent = message;

  document.body.append(div);
}

function onError(error) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'error';
  div.textContent = error.message || error;

  document.body.append(div);
}

firstPromise.then(onSuccess).catch(onError);
secondPromise.then(onSuccess).catch(onError);
thirdPromise.then(onSuccess).catch(onError);
