'use strict';
document.addEventListener('contextmenu', (e) => e.preventDefault());

const body = document.querySelector('body');

const firstPromise = new Promise((resolve, reject) => {
  const leftClickHandler = (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
      document.removeEventListener('click', leftClickHandler);
    }
  };

  document.addEventListener('click', leftClickHandler);

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
    document.removeEventListener('click', leftClickHandler);
  }, 3000);
});

firstPromise.then((message) => {
  const mes = document.createElement('div');

  mes.setAttribute('data-qa', 'notification');
  mes.classList.add('success');
  mes.textContent = message;
  body.appendChild(mes);
});

firstPromise.catch((error) => {
  const mes = document.createElement('div');

  mes.setAttribute('data-qa', 'notification');
  mes.classList.add('error');
  mes.textContent = error.message;
  body.appendChild(mes);
});

const secondPromise = new Promise((resolve) => {
  const secondClickHandler = (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
      document.removeEventListener('mousedown', secondClickHandler);
    }
  };

  document.addEventListener('mousedown', secondClickHandler);
});

secondPromise.then((message) => {
  const mes = document.createElement('div');

  mes.setAttribute('data-qa', 'notification');
  mes.classList.add('success');
  mes.textContent = message;

  body.appendChild(mes);
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  const handler = (e) => {
    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve('Third promise was resolved');
      document.removeEventListener('mousedown', handler);
    }
  };

  document.addEventListener('mousedown', handler);
});

thirdPromise.then((message) => {
  const mes = document.createElement('div');

  mes.setAttribute('data-qa', 'notification');
  mes.classList.add('success');
  mes.textContent = message;
  body.appendChild(mes);
});
