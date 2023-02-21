'use strict';

const body = document.querySelector('body');

body.style.flexDirection = 'column';

const promise1 = new Promise((resolve, reject) => {
  body.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(reject, 3000);
});

const promise2 = new Promise((resolve) => {
  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });

  body.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve) => {
  let count = 0;

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    count++;

    if (count === 2) {
      resolve('Third promise was resolved');
    }
  });

  body.addEventListener('click', () => {
    count++;

    if (count === 2) {
      resolve('Third promise was resolved');
    }
  });
});

promise1
  .then((message) => {
    createElem(message, 'success');
  })
  .catch(() => {
    createElem('First promise was rejected', 'warning');
  });

promise2
  .then((message) => {
    createElem(message, 'success');
  });

promise3
  .then((message) => {
    createElem(message, 'success');
  });

function createElem(m, state) {
  const div = document.createElement('div');

  div.textContent = m;
  div.style.padding = '5px';
  div.style.borderRadius = '10px';
  div.style.border = '5px solid #ffe3b0';
  div.style.marginTop = '10px';
  div.style.backgroundColor = '#f7caca';
  div.setAttribute('data-qa', 'notification');
  div.className = state;

  body.append(div);
}
