'use strict';

// eslint-disable-next-line no-shadow
document.addEventListener('mousedown', function (event) {
  const firstPromise = new Promise((resolve, reject) => {
    if (event.buttons === 1) {
      event.preventDefault();
      resolve(`First promise was resolved`);
    }

    setTimeout(() => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(`First promise was rejected`);
    }, 3000);
  });

  firstPromise.then((result) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add(`success`);
    document.body.appendChild(div);
  });

  // eslint-disable-next-line handle-callback-err
  firstPromise.catch((error) => {
    const div = document.createElement('div');

    div.setAttribute('data-qa', 'notification');
    div.classList.add(`error`);
    document.body.appendChild(div);
  });
});

// eslint-disable-next-line no-shadow
document.addEventListener('mousedown', (event) => {
  const secondPromise = new Promise((resolve, reject) => {
    resolve(`Second promise was resolved`);
  });

  if (event.buttons === 1 || event.buttons === 2) {
    event.preventDefault();

    secondPromise.then((result) => {
      const div = document.createElement('div');

      div.setAttribute('data-qa', 'notification');
      div.classList.add(`success`);
      document.body.appendChild(div);
    });

    // eslint-disable-next-line handle-callback-err
    secondPromise.catch((error) => {
      const div = document.createElement('div');

      div.setAttribute('data-qa', 'notification');
      div.classList.add(`error`);
      document.body.appendChild(div);
    });
  }
});

// eslint-disable-next-line no-shadow
document.addEventListener('mousedown', (event) => {
  let left = false;
  let right = false;

  if (event.buttons === 1) {
    // eslint-disable-next-line no-unused-vars
    left = true;
  }

  if (event.buttons === 2) {
    // eslint-disable-next-line no-unused-vars
    right = true;
  }

  const thirdPromise = new Promise((resolve, reject) => {
    resolve(`Third promise was resolved`);
  });

  if (left === true && right === true) {
    event.preventDefault();

    thirdPromise.then((result) => {
      const div = document.createElement('div');

      div.attributes = 'data-qa="notification';
      div.classList.add(`success`);
      document.body.appendChild(div);
    });
  }
});
