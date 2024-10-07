'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let isResolved = false;

  const clickHandler = () => {
    if (!isResolved) {
      isResolved = true;
      clearTimeout(timer);
      document.removeEventListener('click', clickHandler);

      resolve('First promise was resolved');
    }
  };

  document.addEventListener('click', clickHandler);

  const timer = setTimeout(() => {
    if (!isResolved) {
      isResolved = true;
      document.removeEventListener('click', clickHandler);

      reject(new Error('First promise was rejected'));
    }
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
  let isResolved = false;

  const clickHandler = () => {
    if (!isResolved) {
      isResolved = true;
      document.removeEventListener('click', clickHandler);

      resolve('Second promise was resolved');
    }
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

  const clickHandler = (clickWith) => {
    if (clickWith === 'left') {
      leftClick = true;
    }

    if (clickWith === 'right') {
      rightClick = true;
    }

    if (leftClick && rightClick) {
      document.removeEventListener('click', leftClickHandler);
      document.removeEventListener('contextmenu', rightClickHandler);
      resolve('Third promise was resolved');
    }
  };

  const leftClickHandler = () => clickHandler('left');
  const rightClickHandler = () => clickHandler('right');

  document.addEventListener('click', leftClickHandler);
  document.addEventListener('contextmenu', rightClickHandler);
});

thirdPromise.then((message) => {
  const newElement = document.createElement('div');

  newElement.setAttribute('data-qa', 'notification');
  newElement.classList.add('success');
  newElement.innerText = message;
  document.body.appendChild(newElement);
});
