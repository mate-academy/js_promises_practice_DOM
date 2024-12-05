'use strict';

const body = document.querySelector('body');

function creatDiv(str, className) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(className);

  div.textContent = str;
  body.appendChild(div);
}

function firstPromise() {
  return new Promise((resolve, reject) => {
    document.addEventListener('click', () => {
      resolve('First promise was resolved');
    });

    setTimeout(() => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('First promise was rejected');
    }, 3000);
  });
}

function secondPromise() {
  return new Promise((resolve) => {
    document.addEventListener('click', () => {
      resolve('Second promise was resolved');
    });

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      resolve('Second promise was resolved');
    });
  });
}

function thirdPromise() {
  return new Promise((resolve) => {
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
}

function getNote() {
  const first = firstPromise();
  const second = secondPromise();
  const third = thirdPromise();

  first.then(
    (s) => {
      creatDiv(s, 'success');
    },
    (e) => {
      creatDiv(e, 'error');
    },
  );

  second.then((s) => {
    creatDiv(s, 'success');
  });

  third.then((s) => {
    creatDiv(s, 'success');
  });
}

getNote();
