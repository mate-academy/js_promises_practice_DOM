'use strict';

let leftClick = false;
let rightClick = false;
const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error());
  }, 3000);

  document.addEventListener(
    'click',
    () => {
      clearTimeout(timer);
      resolve('First promise was resolved');
    },
    { once: true },
  );
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('Second promise was resolved');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    if (e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    leftClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    rightClick = true;

    if (leftClick && rightClick) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then(() => {
    const div = document.createElement('div');

    div.textContent = 'First promise was resolved';
    div.setAttribute('data-qa', 'notification');
    div.classList.add('success');
    document.body.appendChild(div);
  })
  .catch(() => {
    const div = document.createElement('div');

    div.textContent = 'First promise was rejected';
    div.setAttribute('data-qa', 'notification');
    div.classList.add('error');
    document.body.appendChild(div);
  });

secondPromise.then(() => {
  const div = document.createElement('div');

  div.textContent = 'Second promise was resolved';
  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  document.body.appendChild(div);
});

thirdPromise.then(() => {
  const div = document.createElement('div');

  div.textContent = 'Third promise was resolved';
  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  document.body.appendChild(div);
});
