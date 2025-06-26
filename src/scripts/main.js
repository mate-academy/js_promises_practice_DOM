'use strict';

document.addEventListener('contextmenu', (e) => e.preventDefault());

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      clearTimeout(timer);
      resolve('First promise was resolved');
    }
  });
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });
});

let leftClicked = false;
let rightClicked = false;
let thirdResolved = false;

const thirdPromise = new Promise((resolve) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      leftClicked = true;
    } else if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked && !thirdResolved) {
      thirdResolved = true;
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((resolve) => {
    const div = document.createElement('div');

    div.classList.add('notification', 'success');
    div.textContent = resolve;
    document.body.appendChild(div);
  })
  .catch((reject) => {
    const div = document.createElement('div');

    div.classList.add('notification', 'error');
    div.textContent = reject;
    document.body.appendChild(div);
  });

secondPromise.then((resolve) => {
  const div = document.createElement('div');

  div.classList.add('notification', 'success');
  div.textContent = resolve;
  document.body.appendChild(div);
});

thirdPromise
  .then((resolve) => {
    const div = document.createElement('div');

    div.classList.add('notification', 'success');
    div.textContent = resolve;
    document.body.appendChild(div);
  })
  .catch((reject) => {
    const div = document.createElement('div');

    div.classList.add('notification', 'error');
    div.textContent = reject;
    document.body.appendChild(div);
  });
