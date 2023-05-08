'use strict';

function showMessage(text, type) {
  const color = type === 'success' ? '#069E2D' : 'red';

  const elem = `<div
                  data-qa='notification'
                  class = ${type}
                  style = "
                    color: ${color};
                    padding: 5px;
                    margin-right: 5px;
                    font-weight: bold;"
                >
                  ${text}
                </div>`;

  document.body.insertAdjacentHTML('beforeend', elem);
};

const firstPromise = new Promise((resolve, reject) => {
  const timeoutFirstPromise = setTimeout(() => {
    reject(new Error(`First promise was rejected`));
  }, 3000);

  document.addEventListener('click', e => {
    clearTimeout(timeoutFirstPromise);
    resolve(`First promise was resolved`);
  }, { once: true });
});

firstPromise.then(
  (message) => showMessage(message, 'success'),
  (error) => showMessage(error.message, 'warning')
);

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', e => {
    e.preventDefault();

    if (e.buttons === 1 || e.buttons === 2) {
      resolve(`Second promise was resolved`);
    }
  });
});

secondPromise.then((message) => showMessage(message, 'success'), null);

const thirdPromise = new Promise((resolve, reject) => {
  let leftButton = false;
  let rightButton = false;

  document.addEventListener('mousedown', e => {
    e.preventDefault();

    if (e.buttons === 1) {
      leftButton = true;
    }

    if (e.buttons === 2) {
      rightButton = true;
    }

    if (leftButton && rightButton) {
      resolve(`Third promise was resolved`);
    }
  });
});

thirdPromise.then((message) => showMessage(message, 'success'), null);
