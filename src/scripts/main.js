'use strict';

const body = document.querySelector('body');

const showError = (error) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('error');
  div.textContent = error.message;
  body.appendChild(div);
};

const firstPromise = new Promise((resolve, reject) => {
  const timeoutId = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  const handleClick = (e) => {
    if (e.button === 0) {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClick);
      resolve('First promise was resolved');
    }
  };

  document.addEventListener('click', handleClick);
});

firstPromise
  .then((message) => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.classList.add('success');
    div.textContent = message;
    body.appendChild(div);
  })

  .catch(showError);

const secondPromise = new Promise((resolve) => {
  const cleanup = () => {
    document.removeEventListener('click', handleLeftClick);
    document.removeEventListener('contextmenu', handleRightClick);
  };

  const handleLeftClick = (e) => {
    if (e.button === 0) {
      cleanup();
      resolve('Second promise was resolved');
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    cleanup();
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', handleLeftClick);
  document.addEventListener('contextmenu', handleRightClick);
});

secondPromise
  .then((message) => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.classList.add('success');
    div.textContent = message;
    body.appendChild(div);
  })

  .catch(showError);

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const checkBothClicked = () => {
    if (leftClicked && rightClicked) {
      document.removeEventListener('click', handleLeftClick);
      document.removeEventListener('contextmenu', handleRightClick);
      resolve('Third promise was resolved');
    }
  };

  const handleLeftClick = (e) => {
    if (e.button === 0) {
      leftClicked = true;
      checkBothClicked();
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    rightClicked = true;
    checkBothClicked();
  };

  document.addEventListener('click', handleLeftClick);
  document.addEventListener('contextmenu', handleRightClick);
});

thirdPromise
  .then((message) => {
    const div = document.createElement('div');

    div.dataset.qa = 'notification';
    div.classList.add('success');
    div.textContent = message;
    body.appendChild(div);
  })

  .catch(showError);
