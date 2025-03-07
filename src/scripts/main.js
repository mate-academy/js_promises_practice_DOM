'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener(
    'click',
    () => resolve(`First promise was resolved`),
    { once: true },
  );

  setTimeout(reject, 3000, `First promise was rejected`);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener(
    'click',
    () => resolve(`Second promise was resolved`),
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      resolve(`Second promise was resolved`);
    },
    { once: true },
  );
});

const thirdPromise = new Promise((resolve) => {
  let isLeftClicked = false;
  let isRightClicked = false;

  document.addEventListener(
    'click',
    () => {
      isLeftClicked = !isLeftClicked;

      if (isLeftClicked && isRightClicked) {
        resolve(`Third promise was resolved`);
      }
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    () => {
      isRightClicked = !isRightClicked;

      if (isLeftClicked && isRightClicked) {
        resolve(`Third promise was resolved`);
      }
    },
    { once: true },
  );
});

function showMessage(message, isError = false) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add(isError ? 'error' : 'success');
  div.textContent = message;

  document.body.append(div);
}

firstPromise.then(
  (message) => showMessage(message),
  (errorMessage) => showMessage(errorMessage, true),
);

secondPromise.then((message) => showMessage(message));
thirdPromise.then((message) => showMessage(message));
