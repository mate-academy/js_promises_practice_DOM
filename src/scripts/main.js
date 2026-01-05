'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let clicked = false;

  const leftClickHandler = (e) => {
    if (e.button === 0) {
      clicked = true;

      clearTimeout(time);
      document.removeEventListener('mousedown', leftClickHandler);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('mousedown', leftClickHandler);

  const time = setTimeout(() => {
    if (!clicked) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const anyClickHandler = (e) => {
    e.preventDefault();

    if (e.button === 0 || e.button === 2) {
      document.removeEventListener('mousedown', anyClickHandler);
      resolve('Second promise was resolved');
    }
  };

  document.addEventListener('mousedown', anyClickHandler);
});

const thirdPromise = new Promise((resolve, reject) => {
  let rightClicked = false;
  let leftClicked = false;

  const thirdLeftClickHandler = (e) => {
    leftClicked = true;

    if (rightClicked && leftClicked) {
      document.removeEventListener('click', thirdLeftClickHandler);
      document.removeEventListener('contextmenu', thirdRightClickHandler);
      resolve('Third promise was resolved');
    }
  };

  const thirdRightClickHandler = (e) => {
    e.preventDefault();
    rightClicked = true;

    if (rightClicked && leftClicked) {
      document.removeEventListener('click', thirdLeftClickHandler);
      document.removeEventListener('contextmenu', thirdRightClickHandler);
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', thirdLeftClickHandler);
  document.addEventListener('contextmenu', thirdRightClickHandler);

});

const successHandler = (text) => {
  const message = document.createElement('div');

  message.classList.add('success');
  message.setAttribute('data-qa', 'notification');
  message.textContent = text;
  document.body.appendChild(message);
};

const errorHandler = (text) => {
  const message = document.createElement('div');

  message.classList.add('error');
  message.setAttribute('data-qa', 'notification');
  message.textContent = text.message;
  document.body.appendChild(message);
};

firstPromise
  .then(successHandler)
  .catch(errorHandler);
secondPromise.then(successHandler);
thirdPromise.then(successHandler).catch(errorHandler);
