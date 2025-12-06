'use strict';

let leftClick = false;
let rightClick = false;
const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
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
  .then((message) => {
    const div = document.createElement('div');

    div.textContent = message;
    div.setAttribute('data-qa', 'notification');
    div.classList.add('success');
    document.body.appendChild(div);
  })
  .catch((err) => {
    const div = document.createElement('div');

    div.textContent = err.message || err;
    div.setAttribute('data-qa', 'notification');
    div.classList.add('error');
    document.body.appendChild(div);
  });

secondPromise
  .then((message) => {
    const div = document.createElement('div');

    div.textContent = message;
    div.setAttribute('data-qa', 'notification');
    div.classList.add('success');
    document.body.appendChild(div);
  })
  .catch((err) => {
    const div = document.createElement('div');

    div.textContent = err.message || err;
    div.setAttribute('data-qa', 'notification');
    div.classList.add('error');
    document.body.appendChild(div);
  });

thirdPromise
  .then((message) => {
    const div = document.createElement('div');

    div.textContent = message;
    div.setAttribute('data-qa', 'notification');
    div.classList.add('success');
    document.body.appendChild(div);
  })
  .catch((err) => {
    const div = document.createElement('div');

    div.textContent = err.message || err;
    div.setAttribute('data-qa', 'notification');
    div.classList.add('error');
    document.body.appendChild(div);
  });
