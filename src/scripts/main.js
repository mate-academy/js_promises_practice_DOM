'use strict';

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let left = false;
  let right = false;

  body.addEventListener('click', () => {
    left = true;

    if (right) {
      resolve('Third promise was resolved');
    }
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    right = true;

    if (left) {
      resolve('Third promise was resolved');
    }
  });
});

const onSuccess = (message) => {
  const mes = document.createElement('div');

  mes.className = 'success';
  mes.setAttribute('data-qa', 'notification');
  mes.innerText = message;

  body.appendChild(mes);
};

const onError = (message) => {
  const mes = document.createElement('div');

  mes.className = 'arning';
  mes.setAttribute('data-qa', 'notification');
  mes.innerText = message;

  body.appendChild(mes);
};

firstPromise.then(onSuccess).catch(onError);
secondPromise.then(onSuccess).catch(onError);
thirdPromise.then(onSuccess).catch(onError);
