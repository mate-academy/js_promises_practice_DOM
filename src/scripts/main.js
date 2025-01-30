'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    resolve('First promise was resolved');
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('mouseup', (e) => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  let isLeft = false;
  let isRight = false;

  document.addEventListener('click', (e) => {
    isLeft = true;

    if (isLeft && isRight) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    isRight = true;

    if (isLeft && isRight) {
      e.preventDefault();
      resolve('Third promise was resolved');
    }
  });
});

function successHandler(text) {
  const div = document.createElement('div');
  const p = document.createElement('p');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  p.textContent = text;
  div.appendChild(p);
  document.body.append(div);
}

function errorHandler(error) {
  const div = document.createElement('div');
  const p = document.createElement('p');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  p.textContent = error.message;
  div.appendChild(p);
  document.body.append(div);
}

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler).catch(errorHandler);
thirdPromise.then(successHandler).catch(errorHandler);
