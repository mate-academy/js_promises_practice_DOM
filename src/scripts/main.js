'use strict';

const doc = document.querySelector('body');
const logo = document.querySelector('h1');

function message(text, result) {
  const div = document.createElement('div');

  div.dataset.qu = 'notification';
  div.classList.add(`${result}`);
  div.innerHTML = text;

  doc.append(div);
}

const promise1 = new Promise((resolve, reject) => {
  logo.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was reject'));
  }, 3000);
});

const promise2 = new Promise((resolve) => {
  logo.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  logo.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve) => {
  let count;

  logo.addEventListener('click', () => {
    count = true;
  });

  logo.addEventListener('contextmenu', () => {
    if (count === true) {
      resolve('Third promise was resolved');
    }
  });
});

promise1.then((data) => message(data, 'success'))
        .catch((data) => message(data, 'warning'));
promise2.then((data) => message(data, 'success'));
promise3.then((data) => message(data, 'success'));
