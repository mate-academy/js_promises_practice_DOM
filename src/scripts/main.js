'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const clickHandler = () => {
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', clickHandler);
  document.addEventListener('contextmenu', clickHandler);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const leftClickHandler = () => {
    leftClicked = true;
    checkBothClicks();
  };

  const rightClickHandler = () => {
    rightClicked = true;
    checkBothClicks();
  };

  const checkBothClicks = () => {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', leftClickHandler);
  document.addEventListener('contextmenu', rightClickHandler);
});

function handleMessage(message, classValue) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.setAttribute('class', classValue);
  div.textContent = message;
  document.body.appendChild(div);
}

firstPromise
  .then((message) => {
    handleMessage(message, 'success');
  })
  .catch((message) => {
    handleMessage(message, 'error');
  });

secondPromise.then((message) => {
  handleMessage(message, 'success');
});

thirdPromise.then((message) => {
  handleMessage(message, 'success');
});
