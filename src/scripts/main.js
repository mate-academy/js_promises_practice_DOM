'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let notClicked = true;

  setTimeout(() => {
    if (notClicked) {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected');
    }
  }, 3000);

  function clickFunc1() {
    notClicked = false;
    resolve('First promise was resolved');
    document.removeEventListener('click', clickFunc1);
  }

  document.addEventListener('click', clickFunc1);
});

const secondPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  function clickFunc2() {
    leftClick = true;

    if (leftClick || rightClick) {
      resolve('Second promise was resolved');
    }
    document.removeEventListener('click', clickFunc2);
    document.removeEventListener('contextmenu', contextmenuFunc2);
  }

  function contextmenuFunc2(e) {
    e.preventDefault();
    rightClick = true;

    if (leftClick || rightClick) {
      resolve('Second promise was resolved');
    }
    document.removeEventListener('click', clickFunc2);
    document.removeEventListener('contextmenu', contextmenuFunc2);
  }

  document.addEventListener('click', clickFunc2);
  document.addEventListener('contextmenu', contextmenuFunc2);
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  function clickFunc3() {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', clickFunc3);
      document.removeEventListener('contextmenu', contextmenuFunc3);
    }
  }

  function contextmenuFunc3(e) {
    e.preventDefault();
    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
      document.removeEventListener('click', clickFunc3);
      document.removeEventListener('contextmenu', contextmenuFunc3);
    }
  }

  document.addEventListener('click', clickFunc3);
  document.addEventListener('contextmenu', contextmenuFunc3);
});

function successHandler(successMessage) {
  const body = document.querySelector('body');
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.textContent = successMessage;
  body.append(div);
}

function errorHandler(errorMessage) {
  const body = document.querySelector('body');
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  div.textContent = errorMessage;
  body.append(div);
}

[firstPromise, secondPromise, thirdPromise].forEach((pr) => {
  pr.then(successHandler).catch(errorHandler);
});
