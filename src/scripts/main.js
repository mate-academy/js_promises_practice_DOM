'use strict';

const firstPromise = new Promise((resolve, reject) => {
  let clickHappened = false;
  let promiseSettled = false;

  document.body.addEventListener('click', () => {
    if (promiseSettled) {
      return;
    }

    const successMessage = `<div class="success" data-qa="notification">
      <p>First promise was resolved</p>
    </div>`;

    promiseSettled = true;
    clickHappened = true;
    resolve(successMessage);
  });

  setTimeout(() => {
    if (!clickHappened && !promiseSettled) {
      const errorMessage = `<div class="error" data-qa="notification">
        <p>First promise was rejected</p>
      </div>`;

      promiseSettled = true;
      reject(errorMessage);
    }
  }, 3000);
});

firstPromise
  .then((successMessage) => {
    document.body.insertAdjacentHTML('beforeend', successMessage);
  })
  .catch((errorMessage) => {
    document.body.insertAdjacentHTML('beforeend', errorMessage);
  });

const secondPromise = new Promise((resolve) => {
  let promiseSettled = false;

  const successMessage = `<div class="success" data-qa="notification">
    <p>Second promise was resolved</p>
  </div>`;

  const resolvePromise = () => {
    if (!promiseSettled) {
      promiseSettled = true;
      resolve(successMessage);
    }
  };

  document.body.addEventListener('click', resolvePromise);
  document.body.addEventListener('contextmenu', resolvePromise);
});

secondPromise.then((successMessage) => {
  document.body.insertAdjacentHTML('beforeend', successMessage);
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClick = false;
  let rightClick = false;
  let promiseSettled = false;

  const successMessage = `<div class="success" data-qa="notification">
    <p>Third promise was resolved</p>
  </div>`;

  document.body.addEventListener('click', () => {
    if (promiseSettled) {
      return;
    }

    leftClick = true;

    if (leftClick && rightClick) {
      promiseSettled = true;
      resolve(successMessage);
    }
  });

  document.body.addEventListener('contextmenu', () => {
    if (promiseSettled) {
      return;
    }

    rightClick = true;

    if (leftClick && rightClick) {
      promiseSettled = true;
      resolve(successMessage);
    }
  });
});

thirdPromise.then((successMessage) => {
  document.body.insertAdjacentHTML('beforeend', successMessage);
});
