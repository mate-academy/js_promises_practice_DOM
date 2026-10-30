'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', (e) => {
    clearTimeout(timer);

    if (e.button === 0) {
      resolve('First promise was resolved');

      return;
    }

    timer = setTimeout(() => {
      reject(new Error('First promise was rejected'));
    }, 3000);
  });
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener(
    'click',
    () => {
      resolve('Second promise was resolved');
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      resolve('Second promise was resolved');
    },
    { once: true },
  );
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', () => {
    leftClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((message) => {
    const success = document.createElement('div');

    success.classList.add('success');
    success.dataset.qa = 'notification';
    success.textContent = message;

    document.body.append(success);
  })
  .catch((error) => {
    const errorMessage = document.createElement('div');

    errorMessage.classList.add('error');
    errorMessage.dataset.qa = 'notification';
    errorMessage.textContent = error.message;

    document.body.append(errorMessage);
  });

secondPromise
  .then((message) => {
    const success = document.createElement('div');

    success.classList.add('success');
    success.dataset.qa = 'notification';
    success.textContent = message;

    document.body.append(success);
  })
  .catch((message) => {
    const error = document.createElement('div');

    error.classList.add('error');
    error.dataset.qa = 'notification';
    error.textContent = message;

    document.body.append(error);
  });

thirdPromise
  .then((message) => {
    const success = document.createElement('div');

    success.classList.add('success');
    success.dataset.qa = 'notification';
    success.textContent = message;

    document.body.append(success);
  })
  .catch((message) => {
    const error = document.createElement('div');

    error.classList.add('error');
    error.dataset.qa = 'notification';
    error.textContent = message;

    document.body.append(error);
  });
