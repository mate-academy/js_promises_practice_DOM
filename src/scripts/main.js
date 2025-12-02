'use strict';

const bodyElem = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  const onClick = (e) => {
    if (e.button === 0) {
      clearTimeout(timer);
      bodyElem.removeEventListener('click', onClick);
      resolve('First promise was resolved');
    }
  };

  bodyElem.addEventListener('click', onClick);

  const timer = setTimeout(() => {
    bodyElem.removeEventListener('click', onClick);
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((message) => {
    const newDiv = document.createElement('div');

    newDiv.setAttribute('data-qa', 'notification');
    newDiv.classList.add('success');
    newDiv.textContent = message;
    document.body.append(newDiv);
  })
  .catch((error) => {
    const newDiv = document.createElement('div');

    newDiv.setAttribute('data-qa', 'notification');
    newDiv.classList.add('error');
    newDiv.textContent = error;
    document.body.append(newDiv);
  });

const secondPromise = new Promise((resolve) => {
  bodyElem.addEventListener('contextmenu', (e) => e.preventDefault());

  bodyElem.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

secondPromise.then((message) => {
  const newDiv = document.createElement('div');

  newDiv.setAttribute('data-qa', 'notification');
  newDiv.classList.add('success');
  newDiv.textContent = message;
  document.body.append(newDiv);
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rigthClick = false;

  bodyElem.addEventListener('contextmenu', (e) => e.preventDefault());

  bodyElem.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rigthClick = true;
    }

    if (leftClick && rigthClick) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then((message) => {
  const newDiv = document.createElement('div');

  newDiv.setAttribute('data-qa', 'notification');
  newDiv.classList.add('success');
  newDiv.textContent = message;
  document.body.append(newDiv);
});
