'use strict';

function showSuccess(message) {
  const success = document.createElement('div');
  success.classList.add('success');
  success.setAttribute('data-qa', 'notification');
  success.textContent = message;
  document.body.append(success);
}

function showError(message) {
  const error = document.createElement('div');
  error.classList.add('error');
  error.setAttribute('data-qa', 'notification');
  error.textContent = message;
  document.body.append(error);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    resolve('Second promise was resolved');
    e.preventDefault();
  });
});

const thirdPromise = new Promise((resolve) => {
  let hasLeftClick = false;
  let hasRightClick = false;

  const checkList = () => {
    if (hasLeftClick && hasRightClick) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', (e) => {
    hasLeftClick = true;
    checkList();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    hasRightClick = true;
    checkList();
  });
});

firstPromise.then(showSuccess).catch(showError);
secondPromise.then(showSuccess).catch(showError);
thirdPromise.then(showSuccess).catch(showError);