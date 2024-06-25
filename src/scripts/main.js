'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', function onClick() {
    if (event.button === 0) {
      clearTimeout(timerId);
      resolve('First promise was resolved');
      document.removeEventListener('click', onClick);
    }
  });
});

firstPromise
  .then((message) => {
    const newDiv = document.createElement('div');

    document.body.appendChild(newDiv);
    newDiv.setAttribute('data-qa', 'notification');
    newDiv.className = 'success';
    newDiv.textContent = message;
  })
  .catch((error) => {
    const newDiv = document.createElement('div');

    document.body.appendChild(newDiv);
    newDiv.setAttribute('data-qa', 'notification');
    newDiv.className = 'error';
    newDiv.textContent = error;
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', function onLeftClick() {
    if (event.button === 0) {
      resolve('Second promise was resolved');
      document.removeEventListener('click', onLeftClick);
    }
  });

  document.addEventListener('contextmenu', function onRightClick() {
    event.preventDefault();

    if (event.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('contextmenu', onRightClick);
    }
  });
});

secondPromise.then((message) => {
  const newDiv = document.createElement('div');

  document.body.appendChild(newDiv);
  newDiv.setAttribute('data-qa', 'notification');
  newDiv.className = 'success';
  newDiv.textContent = message;
});

const thirdPromise = new Promise((resolve) => {
  let isLeftClicked = false;
  let isRightClicked = false;

  function onLeftClick() {
    event.preventDefault();

    if (event.button === 0) {
      isLeftClicked = true;
    }
    isTwoButtonsTrue();
    document.removeEventListener('click', onLeftClick);
  }

  function onRightClick() {
    event.preventDefault();

    if (event.button === 2) {
      isRightClicked = true;
    }
    isTwoButtonsTrue();
    document.removeEventListener('click', onRightClick);
  }

  function isTwoButtonsTrue() {
    if (isLeftClicked && isRightClicked) {
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', onLeftClick);
  document.addEventListener('contextmenu', onRightClick);
});

thirdPromise.then((message) => {
  const newDiv = document.createElement('div');

  document.body.appendChild(newDiv);
  newDiv.setAttribute('data-qa', 'notification');
  newDiv.className = 'success';
  newDiv.textContent = message;
});
