'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve();
  });

  setTimeout(() => {
    reject(new Error('too late'));
  }, 3000);
});

firstPromise
  .then(() => {
    const success = document.createElement('div');

    success.classList.add('success');
    success.dataset.qa = 'notification';
    success.innerText = 'First promise was resolved';
    document.body.appendChild(success);
  })
  .catch(() => {
    const error = document.createElement('div');

    error.classList.add('error');
    error.dataset.qa = 'notification';
    error.innerText = 'First promise was rejected';
    document.body.appendChild(error);
  });

const secondPromise = new Promise((resolve) => {
  document.addEventListener('contextmenu', (click) => {
    click.preventDefault();
    resolve();
  });

  document.addEventListener('click', () => {
    resolve();
  });
});

secondPromise
  .then(() => {
    const success = document.createElement('div');

    success.classList.add('success');
    success.dataset.qa = 'notification';
    success.innerText = 'Second promise was resolved';
    document.body.appendChild(success);
  })
  .catch();

const thirdPromise = new Promise((resolve) => {
  let didLeftClick = false;
  let didRightClick = false;

  const checkCLicks = () => {
    if (didLeftClick && didRightClick) {
      resolve();
    }
  };

  document.addEventListener('contextmenu', (click) => {
    click.preventDefault();
    didRightClick = true;
    checkCLicks();
  });

  document.addEventListener('click', () => {
    didLeftClick = true;
    checkCLicks();
  });
});

thirdPromise
  .then(() => {
    const success = document.createElement('div');

    success.classList.add('success');
    success.dataset.qa = 'notification';
    success.innerText = 'Third promise was resolved';
    document.body.appendChild(success);
  })
  .catch();
