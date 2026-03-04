'use strict';

const body = document.querySelector('body');
const divResFirst = document.createElement('div');
const divRejFirst = document.createElement('div');

divResFirst.setAttribute('data-qa', 'notification');
divRejFirst.setAttribute('data-qa', 'notification');

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      clearTimeout(timer);
    }
  });
});

firstPromise
  .then((res) => {
    divResFirst.classList.add('success');
    divResFirst.textContent = res;
    body.append(divResFirst);
  })
  .catch((rej) => {
    divRejFirst.classList.add('error');
    divRejFirst.textContent = rej.message;
    body.append(divRejFirst);
  });

const divResSecond = document.createElement('div');

divResSecond.setAttribute('data-qa', 'notification');

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      result();
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    result();
  });

  function result() {
    resolve('Second promise was resolved');
  }
});

secondPromise.then((res) => {
  divResSecond.classList.add('success');
  divResSecond.textContent = res;
  body.append(divResSecond);
});

const divResThird = document.createElement('div');

divResThird.setAttribute('data-qa', 'notification');

const thirdPromise = new Promise((resolve) => {
  let rightClick = false;

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClick = true;

    check();
  });

  let leftClick = false;

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    check();
  });

  function check() {
    if (leftClick === true && rightClick === true) {
      resolve('Third promise was resolved');
    }
  }
});

thirdPromise.then((res) => {
  divResThird.classList.add('success');
  divResThird.textContent = res;
  body.append(divResThird);
});
