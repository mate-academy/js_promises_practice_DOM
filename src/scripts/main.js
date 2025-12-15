'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const doc = document.querySelector('html');

  doc.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

firstPromise
  .then((success) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.className = 'success';
    div.textContent = success;
    document.body.appendChild(div);
  })
  .catch((error) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.className = 'error';
    div.textContent = error;
    document.body.appendChild(div);
  });

const secondPromise = new Promise((resolve, reject) => {
  const doc = document.querySelector('html');

  doc.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve('Second promise was resolved');
    }
  });

  doc.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
});

secondPromise.then((success) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'success';
  div.textContent = success;
  document.body.appendChild(div);
});

const thirdPromise = new Promise((resolve, reject) => {
  const doc = document.querySelector('html');

  let leftClick = false;
  let rigthClick = false;

  doc.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rigthClick = true;
    }

    if (leftClick === true && rigthClick === true) {
      resolve('Third promise was resolved');
    }
  });

  doc.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
});

thirdPromise.then((success) => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.className = 'success';
  div.textContent = success;
  document.body.appendChild(div);
});
