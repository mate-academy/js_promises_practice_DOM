'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const docWidth = window.innerWidth;
  const leftPart = docWidth / 2;
  let leftClicked = false;
  let rightClicked = false;
  let timeoutID;

  const firstPromise = new Promise((resolve, reject) => {
    const handleClick = (e) => {
      if (e.clientX < leftPart) {
        leftClicked = true;
        clearTimeout(timeoutID);
        resolve('First promise was resolved');
        document.removeEventListener('click', handleClick);
      }
    };

    document.addEventListener('click', handleClick);

    timeoutID = setTimeout(() => {
      if (!leftClicked) {
        reject('First promise was rejected');
        document.removeEventListener('click', handleClick);
      }
    }, 3000);
  });

  const secondPromise = new Promise((resolve) => {
    const handleClick = () => {
      resolve('Second promise was resolved');
      document.removeEventListener('click', handleClick);
    };

    document.addEventListener('click', handleClick);
  });

  const thirdPromise = new Promise((resolve) => {
    const handleClick = (e) => {
      if (e.clientX < leftPart) {
        leftClicked = true;
      } else {
        rightClicked = true;
      }

      if (leftClicked && rightClicked) {
        resolve('Third promise was resolved');
        document.removeEventListener('click', handleClick);
      }
    };

    document.addEventListener('click', handleClick);
  });

  firstPromise
    .then((message) => showMessage(message, 'success'))
    .catch((errorMessage) => showMessage(errorMessage, 'error'));

  secondPromise.then((message) => showMessage(message, 'success'));

  thirdPromise.then((message) => showMessage(message, 'success'));

  function showMessage(text, type) {
    const divElement = document.createElement('div');

    divElement.classList.add(type);
    divElement.setAttribute('data-qa', 'notification');
    divElement.textContent = text;
    document.body.appendChild(divElement);
  }
});
