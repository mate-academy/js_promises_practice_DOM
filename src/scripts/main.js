'use strict';

const body = document.querySelector('body');
const firstPromise = new Promise((resolve, reject) => {
  let isResolved = false;

  const clickHandler = () => {
    if (!isResolved) {
      isResolved = true;
      document.removeEventListener('click', clickHandler);
      clearTimeout(timer);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('click', clickHandler);

  const timer = setTimeout(() => {
    if (!isResolved) {
      isResolved = true;
      document.removeEventListener('click', clickHandler);

      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected');
    }
  }, 3000);
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

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  const clickHandler = (clickedWith) => {
    if (clickedWith === 'left') {
      leftClicked = true;
    }

    if (clickedWith === 'right') {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
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

firstPromise
  .then((message) => {
    const newElem = document.createElement('div');

    newElem.setAttribute('data-qa', 'notification');
    newElem.classList.add('success');
    newElem.innerText = message;
    body.appendChild(newElem);
  })
  .catch((error) => {
    const newElem = document.createElement('div');

    newElem.setAttribute('data-qa', 'notification');
    newElem.classList.add('error');
    newElem.innerText = error;
    body.appendChild(newElem);
  });

secondPromise.then((message) => {
  const newElem = document.createElement('div');

  newElem.setAttribute('data-qa', 'notification');
  newElem.classList.add('success');
  newElem.innerText = message;
  body.appendChild(newElem);
});

thirdPromise.then((message) => {
  const newElem = document.createElement('div');

  newElem.classList.add('success');
  newElem.innerText = message;
  newElem.setAttribute('data-qa', 'notification');

  body.appendChild(newElem);
});
