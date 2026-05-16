'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  let flag = false;

  document.addEventListener('click', (e) => {
    flag = true;
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    if (!flag) {
      reject(new Error('First promise was rejected'));
    }
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let flagL = false;
  let flagR = false;

  document.addEventListener('click', (e) => {
    flagL = true;

    if (flagL && flagR) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    flagR = true;

    if (flagL && flagR) {
      resolve('Third promise was resolved');
    }
  });
});

const success = (data) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.textContent = data;
  body.append(div);
};

const error = (data) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  div.textContent = data.message;
  body.append(div);
};

firstPromise.then(success, error);
secondPromise.then(success, error);
thirdPromise.then(success, error);
