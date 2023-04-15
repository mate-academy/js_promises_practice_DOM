'use strict';

const body = document.querySelector('body');

const firsPromise = new Promise((resolve, reject) => {
  const firstClick = body.addEventListener('click', () => {
    resolve();
  });

  if (!firstClick) {
    setTimeout(() => {
      reject(Error);
    }, 3000);
  };
});

function resolveMessage(number) {
  body.insertAdjacentHTML('beforeend', `
    <div class="success" data-qa="notification">
      ${number} promise was resolved
    </div>
  `);
};

function rejectMessage(number) {
  body.insertAdjacentHTML('beforeend', `
    <div class="warning" data-qa="notification">
      ${number} promise was rejected
    </div>
  `);
};

firsPromise
  .then(() => {
    resolveMessage('First');
  })
  .catch(() => {
    rejectMessage('First');
  });

const secondPromise = new Promise((resolve) => {
  body.addEventListener('click', () => {
    resolve();
  });

  body.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve();
  });
});

secondPromise
  .then(() => {
    resolveMessage('Second');
  });

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rigthClick = false;

  body.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    }

    if (e.button === 2) {
      rigthClick = true;
    }

    if (leftClick === true && rigthClick === true) {
      resolve();
    }
  });
});

thirdPromise
  .then(() => {
    resolveMessage('Third');
  });
