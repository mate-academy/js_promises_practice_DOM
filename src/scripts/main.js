'use strict';

const promise1 = new Promise((resolve, reject) => {
  const resolveCallback = () => {
    resolve('First promise was resolved');
  };

  document.addEventListener('click', resolveCallback);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('click', resolveCallback);
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  const resolveCallback = (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
    document.removeEventListener('click', resolveCallback);
    document.removeEventListener('contextmenu', resolveCallback);
  };

  document.addEventListener('click', resolveCallback);

  document.addEventListener('contextmenu', resolveCallback);
});

const promise3 = new Promise((resolve) => {
  const bothClicks = { left: false, right: false };
  const resolveCallback = (e) => {
    if (e.type === 'click') {
      bothClicks.left = true;
      document.removeEventListener('click', resolveCallback);
    } else {
      bothClicks.right = true;
      document.removeEventListener('context', resolveCallback);
    }

    if (bothClicks.left && bothClicks.right) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', resolveCallback);

  document.addEventListener('contextmenu', resolveCallback);
});

function errorHandler(message) {
  const newDiv = document.createElement('div');

  newDiv.classList.add('error');
  newDiv.setAttribute('data-qa', 'notification');
  newDiv.textContent = message.message;

  document.body.append(newDiv);
}

function successHandler(message) {
  const newDiv = document.createElement('div');

  newDiv.classList.add('success');
  newDiv.setAttribute('data-qa', 'notification');
  newDiv.textContent = message;

  document.body.append(newDiv);
}

promise1.then(successHandler).catch(errorHandler);
promise2.then(successHandler);
promise3.then(successHandler);
