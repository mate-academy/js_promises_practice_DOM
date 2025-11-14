'use strict';

const bodyField = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  const timerId = setTimeout(reject, 3000, 'First promise was rejected');

  function funClick() {
    resolve('First promise was resolved');

    bodyField.removeEventListener('click', funClick);
    clearTimeout(timerId);
  }

  bodyField.addEventListener('click', funClick);
});

firstPromise
  .then((message) => {
    const divProm1 = document.createElement('div');

    divProm1.setAttribute('data-qa', 'notification');
    divProm1.innerHTML = message;
    divProm1.classList.remove('error');
    divProm1.classList.add('success');

    bodyField.append(divProm1);
  })
  .catch((error) => {
    const divError1 = document.createElement('div');

    divError1.setAttribute('data-qa', 'notification');
    divError1.innerHTML = error;
    divError1.classList.remove('success');
    divError1.classList.add('error');

    bodyField.append(divError1);
  });

const secondPromise = new Promise((resolve, reject) => {
  function funDow() {
    resolve('Second promise was resolved');

    bodyField.removeEventListener('mousedown', funDow);
  }

  bodyField.addEventListener('mousedown', funDow);
});

secondPromise.then((message) => {
  const divProm2 = document.createElement('div');

  divProm2.setAttribute('data-qa', 'notification');
  divProm2.innerHTML = message;
  divProm2.classList.remove('error');
  divProm2.classList.add('success');

  bodyField.append(divProm2);
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;

  bodyField.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');

      leftClick = false;
      rightClick = false;
    }
  });

  bodyField.addEventListener('contextmenu', (ev) => {
    ev.preventDefault();
    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');

      leftClick = false;
      rightClick = false;
    }
  });
});

thirdPromise.then((message) => {
  const divProm3 = document.createElement('div');

  divProm3.setAttribute('data-qa', 'notification');
  divProm3.innerHTML = message;
  divProm3.classList.remove('error');
  divProm3.classList.add('success');

  bodyField.append(divProm3);
});
