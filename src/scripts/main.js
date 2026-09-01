'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', (e) => {
    if (e.button === 0) {
      resolve('First promise was resolved');
    }
  });

  setTimeout(() => reject(new Error('First promise was rejected')), 3000);
});

function success(data) {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class ="success" data-qa="notification">${data}</div>`,
  );
}

function fail(data) {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="error" data-qa="notification">${data}</div>`,
  );
}

firstPromise
  .then((data) => {
    success(data);
  })
  .catch((data) => {
    fail(data);
  });

document.addEventListener('click', (e) => {});

const secondPromise = new Promise((resolve, reject) => {
  function handler(e) {
    e.preventDefault();

    if (e.button === 2 || e.button === 0) {
      resolve('Second promise was resolved');
    }
  }
  document.addEventListener('click', handler);
  document.addEventListener('contextmenu', handler);
});

secondPromise
  .then((data) => {
    success(data);
  })
  .catch((data) => {
    fail(data);
  });

const thirdPromise = new Promise((resolve, reject) => {
  let leftclicks = 0;
  let rightclicks = 0;

  function handler(e) {
    e.preventDefault();

    if (e.button === 0) {
      leftclicks++;
    }

    if (e.button === 2) {
      rightclicks++;
    }

    if (leftclicks > 0 && rightclicks > 0) {
      resolve('Third promise was resolved');
    }
  }

  document.addEventListener('click', handler);
  document.addEventListener('contextmenu', handler);
});

thirdPromise
  .then((data) => {
    success(data);
  })
  .catch((data) => {
    fail(data);
  });
