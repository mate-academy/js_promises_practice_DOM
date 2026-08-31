'use strict';

const success = function (text) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.innerText = text;
  document.body.prepend(div);
};

const error = function (text) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  div.innerText = text;
  document.body.prepend(div);
};

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise.then(success).catch(error);

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

secondPromise.then(success);

const thirdPromise = new Promise((resolve, reject) => {
  let leftclick = false;
  let rightclick = false;

  document.addEventListener('click', () => {
    leftclick = true;

    if (leftclick && rightclick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    rightclick = true;

    if (leftclick && rightclick) {
      resolve('Third promise was resolved');
    }
  });
});

thirdPromise.then(success);
