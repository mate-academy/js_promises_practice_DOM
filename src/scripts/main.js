'use strict';

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const firstPromise = new Promise(async (resolve, reject) => {
  let isTrue = false;

  document.addEventListener('click', () => {
    isTrue = true;
    resolve('First promise was resolved');
  });

  await wait(3000);

  if (!isTrue) {
    reject(new Error('First promise was rejected'));
  }
});

const secondPromise = new Promise((resolve, reject) => {
  let isTrue = false;

  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
    isTrue = true;
  });

  if (isTrue !== true) {
    document.addEventListener('contextmenu', () => {
      resolve('Second promise was resolved');
    });
  }
});

const thirdPromise = new Promise((resolve, reject) => {
  let firstClicked = false;
  let twoClicked = false;

  document.addEventListener('click', () => {
    firstClicked = true;

    if (twoClicked === true && firstClicked === true) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    twoClicked = true;
    e.preventDefault();

    if (twoClicked === true && firstClicked === true) {
      resolve('Third promise was resolved');
    }
  });
});

function success(mess) {
  createDiv('success', mess);
}

function error(mess) {
  createDiv('error', mess);
}

function createDiv(className, message) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');

  div.className = className;
  div.innerText = message;

  document.body.append(div);
}

firstPromise.then(success).catch(error);
secondPromise.then(success).catch(error);
thirdPromise.then(success).catch(error);
