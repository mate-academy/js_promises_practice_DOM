'use strict';

const body = document.querySelector('body');
const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

function success(result) {
  const div = document.createElement('div');

  div.classList.add('success');
  div.innerText = result;
  body.append(div);
}

function error(result) {
  const div = document.createElement('div');

  div.classList.add('warning');
  div.innerText = result;
  body.append(div);
};

firstPromise
  .then(message => {
    success(message);
  })
  .catch(message => {
    error(message);
  });

const secondPromise = new Promise(resolve => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });

  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });
});

secondPromise.then(message => {
  success(message);
});

const thirdPromise = new Promise(resolve => {
  document.addEventListener('click', () => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      resolve('Third promise was resolved');
    });
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    document.addEventListener('click', () => {
      resolve('Third promise was resolved');
    });
  });
});

thirdPromise.then(message => {
  success(message);
});
