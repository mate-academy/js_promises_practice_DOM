'use strict';

let leftClicked = false;
let rightClicked = false;

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(Error('First promise was rejected'));
  }, 3000);

  document.body.addEventListener('click', e => {
    leftClicked = true;
    document.body.removeEventListener('click', this);
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', (e) => {
    leftClicked = true;
    document.body.removeEventListener('click', this);
    resolve('Second promise was resolved');
  });

  document.body.addEventListener('contextmenu', (e) => {
    rightClicked = true;
    document.body.removeEventListener('contextmenu', this);
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('contextmenu', e => {
    rightClicked = true;

    if (leftClicked) {
      document.body.removeEventListener('contextmenu', this);
      resolve('Third promise was resolved');
    }
  });

  document.body.addEventListener('click', e => {
    leftClicked = true;

    if (rightClicked) {
      document.body.removeEventListener('click', this);
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(result => {
    renderResult(result, true);
  })
  .catch(err => {
    renderResult(err, false);
  });

secondPromise
  .then(result => {
    renderResult(result, true);
  });

thirdPromise
  .then(result => {
    renderResult(result, true);
  });

const renderResult = (result, success) => {
  const message = document.createElement('div');

  message.classList.add(
    success
      ? 'success'
      : 'warning'
  );
  message.setAttribute('data-qa', 'notification');
  message.innerHTML = success ? result : result.message;
  document.body.appendChild(message);
};
