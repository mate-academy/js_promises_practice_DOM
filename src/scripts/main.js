'use strict';

function handleSuccess(message) {
  const div = document.createElement('div');

  div.className = 'notification success';
  div.dataset.qa = 'notification';
  div.textContent = message;
  document.body.appendChild(div);
}

function handleError(error) {
  const div = document.createElement('div');

  div.className = 'notification error';
  div.dataset.qa = 'notification';
  div.textContent = error;
  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject('First promise was rejected');
  }, 3000);

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      clearTimeout(timer);
      resolve('First promise was resolved');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

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

firstPromise.then(handleSuccess).catch(handleError);
secondPromise.then(handleSuccess);
thirdPromise.then(handleSuccess);
