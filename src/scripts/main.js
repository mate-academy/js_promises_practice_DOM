'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const clickHandler = () => {
    clearTimeout(timer);
    document.removeEventListener('click', clickHandler);

    resolve('First promise was resolved');
  };

  document.addEventListener('click', clickHandler);

  const timer = setTimeout(() => {
    document.removeEventListener('click', clickHandler);

    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((message) => {
    const newElement = document.createElement('div');

    newElement.setAttribute('data-qa', 'notification');
    newElement.classList.add('success');
    newElement.innerText = message;
    document.body.appendChild(newElement);
  })
  .catch((error) => {
    const newElement = document.createElement('div');

    newElement.setAttribute('data-qa', 'notification');
    newElement.classList.add('error');
    newElement.innerText = error;
    document.body.appendChild(newElement);
  });

const secondPromise = new Promise((resolve, reject) => {
  const clickHandler = () => {
    document.removeEventListener('click', clickHandler);

    resolve('Second promise was resolved');
  };

  document.addEventListener('click', clickHandler);
  document.addEventListener('contextmenu', clickHandler);
});

secondPromise.then((message) => {
  const newElement = document.createElement('div');

  newElement.setAttribute('data-qa', 'notification');
  newElement.classList.add('success');
  newElement.innerText = message;
  document.body.appendChild(newElement);
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  const clickHandler = (click) => {
    if (click.button === 0) {
      leftClick = true;
    }

    if (click.button === 2) {
      click.preventDefault(); // Prevents the menu from appearing
      rightClick = true;
    }

    if (leftClick && rightClick) {
      document.removeEventListener('click', clickHandler);
      document.removeEventListener('contextmenu', clickHandler);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', clickHandler);
  document.addEventListener('contextmenu', clickHandler);
});

thirdPromise.then((message) => {
  const newElement = document.createElement('div');

  newElement.setAttribute('data-qa', 'notification');
  newElement.classList.add('success');
  newElement.innerText = message;
  document.body.appendChild(newElement);
});
