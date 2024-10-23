'use strict';

const clicks = ['click', 'contextmenu'];
let leftClicked = false;
let rightClicked = false;

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error(`First promise was rejected`)), 3000);

  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve) => {
  clicks.forEach((e) => {
    document.addEventListener(e, () => {
      resolve('Second promise was resolved');
    });
  });
});

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    leftClicked = true;
    isClicked();
  });

  document.addEventListener('contextmenu', () => {
    rightClicked = true;
    isClicked();
  });

  function isClicked() {
    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
    }
  }
});

const success = (message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.textContent = message;
  document.body.append(div);
};

const error = (message) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  div.textContent = message;
  document.body.append(div);
};

firstPromise.then(success).catch(error);
secondPromise.then(success);
thirdPromise.then(success);
