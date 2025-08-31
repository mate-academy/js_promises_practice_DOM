'use strict';

function createNotification(className, message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(className);
  div.textContent = message;
  document.body.appendChild(div);
}

function successNtf(message) {
  createNotification('success', message);
}

function errorNtf(message) {
  createNotification('error', message);
}

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(reject, 3000, 'First promise was rejected');
});

firstPromise.then(
  (reason) => successNtf(reason),
  (reason) => errorNtf(reason),
);

const secondPromise = new Promise((resolve) => {
  const resolveF = (value) => {
    value.preventDefault();

    resolve('Second promise was resolved');
  };

  document.addEventListener('click', (ev) => {
    resolveF(ev);
  });

  document.addEventListener('contextmenu', (ev) => {
    resolveF(ev);
  });
});

secondPromise.then((reason) => successNtf(reason));

const thirdPromise = new Promise((resolve, reject) => {
  function thirdPromiseHelper() {
    const validateArr = [];

    document.addEventListener('click', (ev) => {
      ev.preventDefault();

      if (validateArr.includes('right')) {
        resolve('Third promise was resolved');
      } else {
        validateArr.push('left');
      }
    });

    document.addEventListener('contextmenu', (ev) => {
      ev.preventDefault();

      if (validateArr.includes('left')) {
        resolve('Third promise was resolved');
      } else {
        validateArr.push('right');
      }
    });
  }

  thirdPromiseHelper();
});

thirdPromise.then(
  (reason) => successNtf(reason),
  () => errorNtf('Third promise was rejected'),
);
