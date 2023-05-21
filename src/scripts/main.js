'use strict';

function createBlockSuccess(text) {
  const block = document.createElement('div');

  block.setAttribute('data-qa', 'notification');
  block.innerText = text;
  block.className = 'success';
  document.body.append(block);
}

function createBlockError(text) {
  const block = document.createElement('div');

  block.setAttribute('data-qa', 'notification');
  block.innerText = text;
  block.className = 'warning';
  document.body.append(block);
}

const firstPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('click', () => {
    resolve(`First promise was resolved`);
  });

  setTimeout(() => {
    reject(new Error(`First promise was rejected`));
  }, 3000);
});

firstPromise.then((str) => createBlockSuccess(str));
firstPromise.catch((str) => createBlockError(str));

const secondPromise = new Promise((resolve, reject) => {
  document.body.addEventListener('contextmenu', () => {
    resolve(`Second promise was resolved`);
  });

  document.body.addEventListener('click', () => {
    resolve(`Second promise was resolved`);
  });
});

secondPromise.then((str) => createBlockSuccess(str));

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  document.body.addEventListener('click', () => {
    if (leftClick === true) {
      resolve(`Third promise was resolved`);
    }

    rightClick = true;
  });

  document.body.addEventListener('contextmenu', () => {
    if (rightClick === true) {
      resolve(`Third promise was resolved`);
    }

    leftClick = true;
  });
});

thirdPromise.then((str) => createBlockSuccess(str));
