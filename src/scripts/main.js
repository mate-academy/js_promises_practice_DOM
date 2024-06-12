'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const logo = document.querySelector('.logo');

  const handleClick = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      logo.removeEventListener('click', handleClick);
    }
  };

  logo.addEventListener('click', handleClick);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
    logo.removeEventListener('click', handleClick);
  }, 3000);
});

firstPromise.then(
  (success) => {
    const divResolveMessage = document.createElement('div');

    document.body.appendChild(divResolveMessage);
    divResolveMessage.setAttribute('data-qa', 'notification');
    divResolveMessage.textContent = success.message;
  },
  (error) => {
    const divErrorMessage = document.createElement('div');

    document.body.appendChild(divErrorMessage);
    divErrorMessage.setAttribute('data-qa', 'notification');
    divErrorMessage.textContent = error.message;
  },
);

const secondPromise = new Promise((resolve, reject) => {
  const logo = document.querySelector('.logo');

  const handleClick = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      logo.removeEventListener('click', handleClick);
    }
  };

  logo.addEventListener('click', handleClick);
});

secondPromise.then((success) => {
  const divResolveMessage = document.createElement('div');

  document.body.appendChild(divResolveMessage);
  divResolveMessage.setAttribute('data-qa', 'notification');
  divResolveMessage.textContent = success.message;
});

const thirdPromise = new Promise((resolve, reject) => {
  const logo = document.querySelector('.logo');

  const handleClick = (e) => {
    if (e.button === 0 && e.button === 2) {
      resolve('Third promise was resolved');
      logo.removeEventListener('click', handleClick);
    }
  };

  logo.addEventListener('click', handleClick);
});

thirdPromise.then((success) => {
  const divResolveMessage = document.createElement('div');

  document.body.appendChild(divResolveMessage);
  divResolveMessage.setAttribute('data-qa', 'notification');
  divResolveMessage.textContent = success.message;
});
